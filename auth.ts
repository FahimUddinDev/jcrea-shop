import type { UserRole } from "@/types/next-auth";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { cookies } from "next/headers";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        try {
          const cookieStore = cookies();
          const preferredRole = cookieStore.get("preferred_role")
            ?.value as UserRole;
          token.role = preferredRole === "admin" ? "admin" : "user";
        } catch {
          token.role = "user";
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
});
