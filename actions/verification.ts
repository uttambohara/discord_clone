"use server";

import { getUserByEmail } from "@/data/users";
import { getVerificationCodeByToken } from "@/data/verification-code";
import { prisma } from "@/lib/prisma";

export default async function signupVerification(token: string | null) {
  if (!token) return { error: "Token not found!" };

  //  Token exists?
  const existingToken = await getVerificationCodeByToken(token);
  if (!existingToken)
    return { error: "Provided token not found in the server!" };

  //  Has expired?
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Token has already expired!" };

  //  Matches
  const matches = existingToken.token === token;
  if (!matches) return { error: "Provided token doesn't match!" };

  //  If user exists
  const existingUser = await getUserByEmail(existingToken.email);
  if (existingUser) {
    await prisma.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        emailVerified: new Date(),
      },
    });
  }

  await prisma.verificationCode.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Email verified..." };
}
