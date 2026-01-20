import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { creatorProfiles, leads } from "@/lib/db/schema";

function safeString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const db = getDb();
  const url = new URL(request.url);
  const profileId = url.searchParams.get("profileId") ?? "";
  const kind = url.searchParams.get("kind") ?? "";

  if (!profileId || (kind !== "signup" && kind !== "contact")) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const profile = await db.query.creatorProfiles.findFirst({
    where: eq(creatorProfiles.id, profileId),
    columns: { id: true },
  });
  if (!profile) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  const formData = await request.formData();

  const honeypot = safeString(formData.get("company"));
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const email = safeString(formData.get("email"));
  const name = safeString(formData.get("name"));
  const message = safeString(formData.get("message"));

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  await db.insert(leads).values({
    profileId: profile.id,
    kind: kind as "signup" | "contact",
    email,
    name: name || null,
    message: kind === "contact" ? message || null : null,
    meta: {},
  });

  const referrer = request.headers.get("referer");
  if (referrer) {
    try {
      const r = new URL(referrer);
      if (r.origin === url.origin) {
        r.searchParams.set("submitted", "1");
        return NextResponse.redirect(r);
      }
    } catch {
      // ignore
    }
  }

  return NextResponse.json({ ok: true });
}
