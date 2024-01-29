import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

//
export async function generateVerificationToken(email: string) {
  const token = uuidv4();
  const expires = new Date(Date.now() + 3 * 60 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  return await prisma.verificationToken.create({
    data: {
      email,
      expires,
      token,
    },
  });
}

//
export function getVerificationTokenByEmail(email: string) {
  return prisma.verificationToken.findFirst({
    where: {
      email,
    },
  });
}
export function getVerificationTokenByToken(token: string) {
  return prisma.verificationToken.findFirst({
    where: {
      token,
    },
  });
}
