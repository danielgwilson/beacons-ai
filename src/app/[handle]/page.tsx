import { and, asc, eq } from "drizzle-orm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { auth } from "@/auth";
import { CreatorPage } from "@/components/creator/creator-page";
import { getDb } from "@/lib/db";
import { blocks, creatorProfiles, workspaceMembers } from "@/lib/db/schema";
import { normalizeHandle } from "@/lib/handles";
import { coerceCreatorTheme } from "@/lib/theme";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const normalized = normalizeHandle(handle);
  const db = getDb();

  const profile = await db.query.creatorProfiles.findFirst({
    where: eq(creatorProfiles.handle, normalized),
    columns: { displayName: true, bio: true, handle: true },
  });

  if (!profile) return {};

  const title = `${profile.displayName} (@${profile.handle})`;
  const description =
    profile.bio ?? `Links and content from ${profile.displayName}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
    },
  };
}

export default async function CreatorHandlePage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const normalized = normalizeHandle(handle);
  const db = getDb();

  const [session, profile] = await Promise.all([
    auth(),
    db.query.creatorProfiles.findFirst({
      where: eq(creatorProfiles.handle, normalized),
    }),
  ]);

  if (!profile || !profile.published) notFound();

  const pageBlocks = await db
    .select()
    .from(blocks)
    .where(eq(blocks.profileId, profile.id))
    .orderBy(asc(blocks.sortOrder), asc(blocks.createdAt));

  // Check if the current user is a member of the workspace that owns this profile
  let isOwner = false;
  if (session?.user?.id) {
    const membership = await db.query.workspaceMembers.findFirst({
      where: and(
        eq(workspaceMembers.workspaceId, profile.workspaceId),
        eq(workspaceMembers.userId, session.user.id),
      ),
    });
    isOwner = !!membership;
  }

  return (
    <CreatorPage
      profile={{
        id: profile.id,
        handle: profile.handle,
        displayName: profile.displayName,
        bio: profile.bio,
        avatarUrl: profile.avatarUrl,
        theme: coerceCreatorTheme(profile.theme),
      }}
      blocks={pageBlocks.map((b) => ({
        id: b.id,
        type: b.type,
        enabled: b.enabled,
        data: b.data,
      }))}
      isOwner={isOwner}
    />
  );
}
