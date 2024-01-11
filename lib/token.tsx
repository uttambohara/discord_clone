import { getVerificationCodeByEmail } from "@/data/verification-code";
import { prisma } from "./prisma";
import { v4 as uuidv4 } from "uuid";

export async function generateVerificationCode(email: string) {
  const existingVerificationCode = await getVerificationCodeByEmail(email);

  const expires = new Date(Date.now() + 60 * 60 * 1000);
  const token = uuidv4();

  if (existingVerificationCode) {
    await prisma.verificationCode.delete({
      where: {
        id: existingVerificationCode.id,
      },
    });
  }

  return await prisma.verificationCode.create({
    data: {
      email,
      expires,
      token,
    },
  });
}
