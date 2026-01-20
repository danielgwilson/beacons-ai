import { randomBytes } from "node:crypto";
import { and, eq } from "drizzle-orm";
import { defaultBlockData } from "@/lib/blocks";
import { getDb } from "@/lib/db";
import {
  blocks,
  creatorProfiles,
  users,
  workspaceMembers,
  workspaces,
} from "@/lib/db/schema";
import {
  deriveHandleFromEmail,
  normalizeHandle,
  validateHandle,
} from "@/lib/handles";

function randomSuffix(length = 6): string {
  return randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}

export async function ensureUserProvisioned(input: {
  email: string;
  name: string | null;
  image: string | null;
}) {
  const db = getDb();
  const [user] = await db
    .insert(users)
    .values({
      email: input.email,
      name: input.name ?? undefined,
      image: input.image ?? undefined,
    })
    .onConflictDoUpdate({
      target: users.email,
      set: {
        name: input.name ?? undefined,
        image: input.image ?? undefined,
        updatedAt: new Date(),
      },
    })
    .returning();

  const existingMembership = await db.query.workspaceMembers.findFirst({
    where: eq(workspaceMembers.userId, user.id),
  });

  const workspaceId =
    existingMembership?.workspaceId ??
    (
      await db
        .insert(workspaces)
        .values({
          slug: `p-${randomSuffix(10)}`,
          name: input.name?.trim() || "Personal",
        })
        .returning()
    )[0]?.id;

  if (!workspaceId) {
    throw new Error("Failed to create workspace.");
  }

  if (!existingMembership) {
    await db.insert(workspaceMembers).values({
      workspaceId,
      userId: user.id,
      role: "owner",
    });
  }

  const existingProfile = await db.query.creatorProfiles.findFirst({
    where: eq(creatorProfiles.workspaceId, workspaceId),
  });

  if (existingProfile) {
    return { user, workspaceId, profile: existingProfile };
  }

  const baseHandle = deriveHandleFromEmail(input.email);

  const createUniqueHandle = async (candidate: string): Promise<string> => {
    const normalized = normalizeHandle(candidate);
    const validated = validateHandle(normalized);
    if (!validated.ok) {
      return `${baseHandle}-${randomSuffix(4)}`;
    }

    const existing = await db.query.creatorProfiles.findFirst({
      where: eq(creatorProfiles.handle, validated.normalized),
      columns: { id: true },
    });
    if (!existing) return validated.normalized;

    return `${validated.normalized}-${randomSuffix(4)}`;
  };

  const handle = await createUniqueHandle(baseHandle);
  const displayName = input.name?.trim() || baseHandle;

  const [profile] = await db
    .insert(creatorProfiles)
    .values({
      workspaceId,
      handle,
      displayName,
      bio: null,
      avatarUrl: input.image ?? null,
    })
    .returning();

  await db.insert(blocks).values([
    {
      profileId: profile.id,
      type: "link",
      sortOrder: 1,
      enabled: true,
      data: defaultBlockData("link"),
    },
    {
      profileId: profile.id,
      type: "social",
      sortOrder: 2,
      enabled: true,
      data: defaultBlockData("social"),
    },
    {
      profileId: profile.id,
      type: "signup",
      sortOrder: 3,
      enabled: false,
      data: defaultBlockData("signup"),
    },
  ]);

  return { user, workspaceId, profile };
}

export async function assertWorkspaceAccess(input: {
  userId: string;
  workspaceId: string;
}) {
  const db = getDb();
  const membership = await db.query.workspaceMembers.findFirst({
    where: and(
      eq(workspaceMembers.userId, input.userId),
      eq(workspaceMembers.workspaceId, input.workspaceId),
    ),
  });

  if (!membership) {
    throw new Error("Not authorized for workspace.");
  }

  return membership;
}
