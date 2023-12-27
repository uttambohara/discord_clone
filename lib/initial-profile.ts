import { prisma } from "@/lib/prisma";
import { auth, redirectToSignUp } from "@clerk/nextjs";

export default async function currentProfile() {
  const { userId } = auth();

  if (!userId) return redirectToSignUp();

  const profile = await prisma.profile.findFirst({
    where: {
      userId,
    },
  });

  if (!profile) return null;

  return profile;
}
