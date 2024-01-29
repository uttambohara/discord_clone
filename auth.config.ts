import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import { getUserByEmail } from "./data/users";
import { loginSchema } from "./schemas";

import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export default {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        const validatedValue = loginSchema.safeParse(credentials);
        if (!validatedValue.success) return null;
        //
        const { email, password } = validatedValue.data;
        const emailExists = await getUserByEmail(email);
        if (!emailExists || !emailExists.password) return null;

        // Check password
        const correctPassword = await bcrypt.compare(
          password,
          emailExists.password
        );

        if (correctPassword) return emailExists;

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
