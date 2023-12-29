import { auth, redirectToSignIn } from "@clerk/nextjs";
import { prisma } from "./prisma";

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
