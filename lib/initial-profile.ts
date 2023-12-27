import { prisma } from "@/lib/prisma";
import { currentUser, redirectToSignUp } from "@clerk/nextjs";

export default async function initialProfile() {
  const currUser = await currentUser();

  if (!currUser) return redirectToSignUp();

  const profile = await prisma.profile.findFirst({
    where: {
      userId: currUser.id,
    },
  });

  if (!profile) {
    const profile = await prisma.profile.create({
      data: {
        email: currUser.emailAddresses[0].emailAddress,
        name: currUser.firstName!,
        imageUrl: currUser.imageUrl,
        userId: currUser.id,
      },
    });

    return profile;
  }

  return profile;
}
