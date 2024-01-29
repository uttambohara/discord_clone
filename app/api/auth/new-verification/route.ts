import { getVerificationTokenByToken } from "@/data/verification-token";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const value = await request.json();
    const { token } = value;

    if (!token) {
      return new NextResponse("Token not found!", { status: 400 });
    }

    // Check verification token
    const exisitingToken = await getVerificationTokenByToken(token);
    if (!exisitingToken) {
      return new NextResponse("Verification token not found!", { status: 400 });
    }

    // Check token expiry
    const expired = exisitingToken.expires > new Date();
    if (!expired) {
      return new NextResponse("Token has expired!", { status: 400 });
    }

    // Update user and add email verified
    await prisma.user.update({
      where: {
        email: exisitingToken.email,
      },
      data: {
        emailVerified: new Date(),
      },
    });

    // Delete the verification token
    await prisma.verificationToken.delete({
      where: {
        id: exisitingToken.id,
      },
    });

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.log("update_error", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
