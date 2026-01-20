import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { getDb } from "@/lib/db";
import { ensureUserProvisioned } from "@/lib/provisioning";

const googleClientId =
  process.env.AUTH_GOOGLE_ID ?? process.env.GOOGLE_CLIENT_ID ?? "";
const googleClientSecret =
  process.env.AUTH_GOOGLE_SECRET ?? process.env.GOOGLE_CLIENT_SECRET ?? "";

const authSecret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: authSecret,
  pages: {
    signIn: "/signin",
  },
  providers:
    googleClientId && googleClientSecret
      ? [
          Google({
            clientId: googleClientId,
            clientSecret: googleClientSecret,
          }),
        ]
      : [],
  events: {
    async signIn({ user }) {
      const email = user.email ?? "";
      if (!email) return;
      await ensureUserProvisioned({
        email,
        name: user.name ?? null,
        image: user.image ?? null,
      });
    },
  },
  callbacks: {
    async jwt({ token }) {
      const email = typeof token.email === "string" ? token.email : "";
      if (!email) return token;

      const db = getDb();
      const existingUser = await db.query.users.findFirst({
        where: (t, { eq }) => eq(t.email, email),
        columns: { id: true },
      });

      if (!existingUser) return token;

      token.userId = existingUser.id;

      const membership = await db.query.workspaceMembers.findFirst({
        where: (t, { eq }) => eq(t.userId, existingUser.id),
        columns: { workspaceId: true },
      });

      if (!membership) return token;

      const profile = await db.query.creatorProfiles.findFirst({
        where: (t, { eq }) => eq(t.workspaceId, membership.workspaceId),
        columns: { handle: true, id: true },
      });

      if (profile) {
        token.profileId = profile.id;
        token.profileHandle = profile.handle;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = typeof token.userId === "string" ? token.userId : "";
      }
      session.profileHandle =
        typeof token.profileHandle === "string" ? token.profileHandle : null;
      return session;
    },
  },
});
