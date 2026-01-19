import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    profileHandle: string | null;
    user: DefaultSession["user"] & {
      id: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    profileId?: string;
    profileHandle?: string;
  }
}
