import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, UserRole } from "@prisma/client";
import authConfig from "./auth.config";
import { getUserById } from "./data/users";

const prisma = new PrismaClient();

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  events: {
    async linkAccount({ user, account, profile }) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account && account.provider === "credentiall") {
        const userData = await getUserById(user.id);
        if (!userData?.emailVerified) return false;
      }

      return true;
    },
    async session({ session, user, token }) {
      if (token || session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (!token || !token.sub) return null;
      token.id = token.sub;
      // db
      const userData = await getUserById(token.sub);
      token.role = userData?.role;
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
