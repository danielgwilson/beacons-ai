import { cookies, headers } from "next/headers";

import { auth } from "@/auth";

export type AuthIdentity = {
  email: string;
  name: string | null;
  image: string | null;
  mode: "nextauth" | "e2e";
};

const E2E_COOKIE_NAME = "e2e_email";

export async function getAuthIdentity(): Promise<AuthIdentity | null> {
  if (process.env.E2E === "1") {
    const h = await headers();
    const fromHeader = h.get("x-e2e-email")?.trim() ?? "";
    const store = await cookies();
    const fromCookie = store.get(E2E_COOKIE_NAME)?.value?.trim() ?? "";
    const email = fromHeader || fromCookie;
    if (email) {
      return { email, name: "E2E User", image: null, mode: "e2e" };
    }
  }

  const session = await auth();
  const email = session?.user?.email ?? "";
  if (!email) return null;

  return {
    email,
    name: session?.user?.name ?? null,
    image: session?.user?.image ?? null,
    mode: "nextauth",
  };
}

export async function setE2EEmail(email: string) {
  const store = await cookies();
  store.set(E2E_COOKIE_NAME, email, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
}

export async function clearE2EEmail() {
  const store = await cookies();
  store.delete(E2E_COOKIE_NAME);
}
