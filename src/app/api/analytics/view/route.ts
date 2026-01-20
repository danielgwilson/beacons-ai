import { and, desc, eq, gt, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { analyticsEvents, creatorProfiles } from "@/lib/db/schema";
import { normalizeHandle } from "@/lib/handles";
import { hashIpForAnalytics, trackEvent } from "@/lib/server/analytics";
import { getRequestMeta } from "@/lib/server/request";

export async function POST(request: Request) {
  const db = getDb();
  const body = (await request.json().catch(() => null)) as {
    handle?: string;
  } | null;

  const handle = normalizeHandle(body?.handle ?? "");
  if (!handle) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const profile = await db.query.creatorProfiles.findFirst({
    where: eq(creatorProfiles.handle, handle),
    columns: { id: true },
  });

  if (!profile) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  const meta = await getRequestMeta();
  if (meta.ip) {
    const ipHash = hashIpForAnalytics(meta.ip);
    const last = await db.query.analyticsEvents.findFirst({
      where: and(
        eq(analyticsEvents.profileId, profile.id),
        eq(analyticsEvents.type, "view"),
        gt(analyticsEvents.createdAt, sql`now() - interval '10 seconds'`),
      ),
      orderBy: desc(analyticsEvents.createdAt),
      columns: { ipHash: true },
    });

    if (ipHash && last?.ipHash === ipHash) {
      return NextResponse.json({ ok: true });
    }
  }

  await trackEvent({ profileId: profile.id, type: "view" });

  return NextResponse.json({ ok: true });
}
