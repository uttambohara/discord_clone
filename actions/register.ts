"use server";

import { getUserByEmail } from "@/data/users";
import { sendVerificationEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { generateVerificationCode } from "@/lib/token";
import { RegisterSchema, registerSchema } from "@/schemas";
import bcrypt from "bcryptjs";

export async function register(values: RegisterSchema) {
  //
  const verifiedValues = registerSchema.safeParse(values);
  if (!verifiedValues.success) return { error: "Invalid credentials!" };
  const { name, email, password } = verifiedValues.data;

  //  Does user exists?
  const existingUser = await getUserByEmail(email);
  if (existingUser) return { error: "Email already exists!" };

  // If not, create a new user
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Verification code generation
  const newVerificationCode = await generateVerificationCode(email);
  // Send email
  await sendVerificationEmail(email, newVerificationCode.token);

  return { success: "Verification email sent..." };
}
