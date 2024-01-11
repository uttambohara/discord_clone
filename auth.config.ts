import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "./data/users";
import { sendVerificationEmail } from "./lib/email";
import { generateVerificationCode } from "./lib/token";
import { loginSchema } from "./schema";

export default {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        const verifiedCredentials = loginSchema.safeParse(credentials);
        if (!verifiedCredentials.success) return null;
        const { email, password } = verifiedCredentials.data;

        // Does user exist?
        const existingUser = await getUserByEmail(email);
        if (!existingUser) return null;

        // OAuth?
        if (!existingUser.password) return null;

        // Check password
        const correctPassword = await bcrypt.compare(
          password,
          existingUser.password
        );

        if (!correctPassword) return null;

        //
        const emailVerified = existingUser.emailVerified;
        if (!emailVerified) {
          // Verification code generation
          const newVerificationCode = await generateVerificationCode(email);
          // Send email
          await sendVerificationEmail(email, newVerificationCode.token);
        }

        // Return user
        return existingUser;
      },
    }),
  ],
} satisfies NextAuthConfig;
