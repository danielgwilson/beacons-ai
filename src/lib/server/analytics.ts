import { createHmac } from "node:crypto";

import { getDb } from "@/lib/db";
import { analyticsEvents } from "@/lib/db/schema";
import { getRequestMeta } from "@/lib/server/request";

function getAnalyticsSalt(): string {
  const salt =
    process.env.ANALYTICS_SALT ??
    process.env.AUTH_SECRET ??
    process.env.NEXTAUTH_SECRET ??
    "";
  return salt.trim();
}

export function hashIpForAnalytics(ip: string): string | null {
  const salt = getAnalyticsSalt();
  if (!salt) return null;
  return createHmac("sha256", salt).update(ip).digest("hex");
}

export async function trackEvent(input: {
  profileId: string;
  blockId?: string | null;
  type: "view" | "click";
  url?: string | null;
}) {
  const db = getDb();
  const meta = await getRequestMeta();
  const ipHash = meta.ip ? hashIpForAnalytics(meta.ip) : null;

  await db.insert(analyticsEvents).values({
    profileId: input.profileId,
    blockId: input.blockId ?? null,
    type: input.type,
    url: input.url ?? null,
    referrer: meta.referrer ?? null,
    userAgent: meta.userAgent ?? null,
    ipHash,
  });
}
