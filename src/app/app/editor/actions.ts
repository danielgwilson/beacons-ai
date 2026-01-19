"use server";

import { asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import type { BlockType } from "@/lib/blocks";
import { defaultBlockData } from "@/lib/blocks";
import { getDb } from "@/lib/db";
import { blocks } from "@/lib/db/schema";
import { getMyWorkspaceAndProfile } from "@/lib/me";

function safeString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function parseSocialLines(
  lines: string,
): Array<{ platform: string; url: string }> {
  return lines
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const [platform, ...rest] = line.split(/[,\s]+/);
      return { platform: platform ?? "", url: rest.join(" ") };
    })
    .filter((l) => l.platform && l.url)
    .slice(0, 12);
}

export async function createBlock(type: BlockType) {
  const db = getDb();
  const { profile } = await getMyWorkspaceAndProfile();
  const existing = await db.query.blocks.findMany({
    where: eq(blocks.profileId, profile.id),
    orderBy: asc(blocks.sortOrder),
    columns: { sortOrder: true },
  });

  const nextSort = (existing.at(-1)?.sortOrder ?? 0) + 1;

  await db.insert(blocks).values({
    profileId: profile.id,
    type,
    sortOrder: nextSort,
    enabled: true,
    data: defaultBlockData(type),
  });

  revalidatePath("/app/editor");
  revalidatePath(`/${profile.handle}`);
}

export async function deleteBlock(blockId: string) {
  const db = getDb();
  const { profile } = await getMyWorkspaceAndProfile();

  const block = await db.query.blocks.findFirst({
    where: eq(blocks.id, blockId),
    columns: { id: true, profileId: true },
  });

  if (!block || block.profileId !== profile.id) {
    throw new Error("Block not found.");
  }

  await db.delete(blocks).where(eq(blocks.id, blockId));

  revalidatePath("/app/editor");
  revalidatePath(`/${profile.handle}`);
}

export async function toggleBlock(blockId: string) {
  const db = getDb();
  const { profile } = await getMyWorkspaceAndProfile();

  const block = await db.query.blocks.findFirst({
    where: eq(blocks.id, blockId),
    columns: { id: true, profileId: true, enabled: true },
  });

  if (!block || block.profileId !== profile.id) {
    throw new Error("Block not found.");
  }

  await db
    .update(blocks)
    .set({ enabled: !block.enabled, updatedAt: new Date() })
    .where(eq(blocks.id, blockId));

  revalidatePath("/app/editor");
  revalidatePath(`/${profile.handle}`);
}

export async function moveBlock(blockId: string, direction: "up" | "down") {
  const db = getDb();
  const { profile } = await getMyWorkspaceAndProfile();

  const list = await db
    .select()
    .from(blocks)
    .where(eq(blocks.profileId, profile.id))
    .orderBy(asc(blocks.sortOrder), asc(blocks.createdAt));

  const index = list.findIndex((b) => b.id === blockId);
  if (index < 0) throw new Error("Block not found.");

  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (swapWith < 0 || swapWith >= list.length) return;

  const a = list[index];
  const b = list[swapWith];
  if (!a || !b) return;

  await db.transaction(async (tx) => {
    await tx
      .update(blocks)
      .set({ sortOrder: b.sortOrder, updatedAt: new Date() })
      .where(eq(blocks.id, a.id));
    await tx
      .update(blocks)
      .set({ sortOrder: a.sortOrder, updatedAt: new Date() })
      .where(eq(blocks.id, b.id));
  });

  revalidatePath("/app/editor");
  revalidatePath(`/${profile.handle}`);
}

export async function updateBlock(blockId: string, formData: FormData) {
  const db = getDb();
  const { profile } = await getMyWorkspaceAndProfile();

  const block = await db.query.blocks.findFirst({
    where: eq(blocks.id, blockId),
    columns: { id: true, profileId: true, type: true },
  });

  if (!block || block.profileId !== profile.id) {
    throw new Error("Block not found.");
  }

  const type = block.type as BlockType;

  let data: unknown;

  switch (type) {
    case "link":
      data = {
        title: safeString(formData.get("title")),
        url: safeString(formData.get("url")),
        subtitle: safeString(formData.get("subtitle")) || undefined,
      };
      break;
    case "text":
      data = {
        title: safeString(formData.get("title")) || undefined,
        markdown: safeString(formData.get("markdown")),
      };
      break;
    case "image":
      data = {
        url: safeString(formData.get("url")),
        alt: safeString(formData.get("alt")) || undefined,
        href: safeString(formData.get("href")) || undefined,
      };
      break;
    case "embed":
      data = {
        url: safeString(formData.get("url")),
        title: safeString(formData.get("title")) || undefined,
      };
      break;
    case "social":
      data = {
        links: parseSocialLines(safeString(formData.get("links"))),
      };
      break;
    case "support":
      data = {
        title: safeString(formData.get("title")),
        url: safeString(formData.get("url")),
      };
      break;
    case "signup":
      data = {
        title: safeString(formData.get("title")),
        description: safeString(formData.get("description")) || undefined,
        leadMagnetUrl: safeString(formData.get("leadMagnetUrl")) || undefined,
        thankYouMessage:
          safeString(formData.get("thankYouMessage")) || undefined,
      };
      break;
    case "contact":
      data = {
        title: safeString(formData.get("title")),
        description: safeString(formData.get("description")) || undefined,
        thankYouMessage:
          safeString(formData.get("thankYouMessage")) || undefined,
      };
      break;
  }

  await db
    .update(blocks)
    .set({
      data,
      updatedAt: new Date(),
    })
    .where(eq(blocks.id, blockId));

  revalidatePath("/app/editor");
  revalidatePath(`/${profile.handle}`);
}
