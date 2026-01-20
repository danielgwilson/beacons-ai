import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { blocks } from "@/lib/db/schema";
import { trackEvent } from "@/lib/server/analytics";

function safeString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ blockId: string }> },
) {
  const { blockId } = await params;

  const db = getDb();
  const block = await db.query.blocks.findFirst({
    where: eq(blocks.id, blockId),
    columns: { id: true, profileId: true, type: true, data: true },
  });

  if (!block) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const data =
    block.data && typeof block.data === "object" && !Array.isArray(block.data)
      ? (block.data as Record<string, unknown>)
      : {};

  const url = safeString(data.url);
  if (!url) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  let destination: URL | null = null;
  try {
    destination = new URL(url);
    if (destination.protocol !== "http:" && destination.protocol !== "https:") {
      destination = null;
    }
  } catch {
    destination = null;
  }

  if (!destination) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  await trackEvent({
    profileId: block.profileId,
    blockId: block.id,
    type: "click",
    url: destination.toString(),
  });

  return NextResponse.redirect(destination);
}
