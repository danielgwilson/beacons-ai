import { headers } from "next/headers";

export async function getClientIp(): Promise<string | null> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    return first || null;
  }

  const realIp = h.get("x-real-ip");
  return realIp?.trim() || null;
}

export async function getRequestMeta(): Promise<{
  ip: string | null;
  userAgent: string | null;
  referrer: string | null;
}> {
  const h = await headers();
  return {
    ip: await getClientIp(),
    userAgent: h.get("user-agent"),
    referrer: h.get("referer"),
  };
}
