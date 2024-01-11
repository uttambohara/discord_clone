"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/users";
import { LoginSchema, loginSchema } from "@/schema";
import { AuthError } from "next-auth";
import { LOGIN_SUCCESS_REDIRECT } from "@/routes";
import { generateVerificationCode } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/email";

export async function login(values: LoginSchema) {
  //
  const verifiedValues = loginSchema.safeParse(values);
  if (!verifiedValues.success) return { error: "Invalid credentials!" };
  const { email, password } = verifiedValues.data;

  //  Does user exists?
  const existingUser = await getUserByEmail(email);
  if (!existingUser) return { error: "Email not found in our server!" };

  if (!existingUser.password)
    return { error: "Email already taken by other provider!" };

  if (!existingUser.emailVerified) {
    // Verification code generation
    const newVerificationCode = await generateVerificationCode(email);
    // Send email
    await sendVerificationEmail(email, newVerificationCode.token);

    return { error: "Email not verified! \nCheck your email..." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: LOGIN_SUCCESS_REDIRECT,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw err;
  }
  //
}
