import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/users";
import { generateVerificationToken } from "@/data/verification-token";
import { sendVerificationTokenByEmail } from "@/lib/email";
import { LOGIN_SUCCESS_REDIRECT } from "@/routes";
import { loginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    //
    const value = await request.json();
    const validatedValue = loginSchema.safeParse(value);
    if (!validatedValue.success)
      return new NextResponse("Invalid fields!", { status: 400 });

    //
    const { email, password } = value;
    const emailExists = await getUserByEmail(email);
    if (!emailExists || !emailExists.password)
      return new NextResponse(
        "Email doesn't exists/ taken by other provider!",
        { status: 401 }
      );

    //
    //  Email verification check
    if (!emailExists.emailVerified) {
      // Generate token
      const createdToken = await generateVerificationToken(email);
      // Send an email
      try {
        await sendVerificationTokenByEmail(email, createdToken.token);
        return new NextResponse("Verification email sent!", { status: 404 });
      } catch (err) {
        return new NextResponse("Resend error!", { status: 404 });
      }
    }

    try {
      await signIn("credentials", {
        email,
        password,
        redirectTo: LOGIN_SUCCESS_REDIRECT, // This is not working
      });
    } catch (err) {
      if (err instanceof AuthError) {
        switch (err.type) {
          case "CredentialsSignin":
            return new NextResponse("Invalid Credentials!", { status: 401 });
          default:
            return new NextResponse("Something went wrong!", { status: 401 });
        }
      }
    }

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.log("login_user", err);
    return new NextResponse("Internal error!", { status: 500 });
  }
}
