import { prisma } from "@/lib/prisma";

export async function getVerificationCodeByEmail(email: string) {
  return await prisma.verificationCode.findFirst({
    where: {
      email,
    },
  });
}
export async function getVerificationCodeByToken(token: string) {
  return await prisma.verificationCode.findFirst({
    where: {
      token,
    },
  });
}
