import { getUserByEmail } from "@/data/users";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "@/data/verification-token";
import { sendVerificationTokenByEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    // Data validation
    const value = await request.json();
    const validatedValue = registerSchema.safeParse(value);
    if (!validatedValue.success)
      return new NextResponse("Invalid fields!", { status: 400 });

    //
    const { fullname, email, password } = value;
    const emailExists = await getUserByEmail(email);
    if (emailExists)
      return new NextResponse("Email already exists!", { status: 409 });

    // Generate token
    const createdToken = await generateVerificationToken(email);
    // Send an email
    try {
      await sendVerificationTokenByEmail(email, createdToken.token);
    } catch (err) {
      console.log(err);
    }

    // Hash password and create account
    const hashedPassword = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: {
        name: fullname,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.log("register_user", err);
    return new NextResponse("Internal error!", { status: 500 });
  }
}
