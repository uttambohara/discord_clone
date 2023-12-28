import { prisma } from "@/lib/prisma";
import { auth, redirectToSignIn } from "@clerk/nextjs";

export default async function currentProfile() {
  const { userId } = auth();

  if (!userId) return redirectToSignIn();

  const profile = await prisma.profile.findFirst({
    where: {
      userId,
    },
  });

  if (!profile) return null;

  return profile;
}
