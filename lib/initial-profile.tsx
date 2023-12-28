import { prisma } from "@/lib/prisma";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";

export default async function initialProfile() {
  const user = await currentUser();
  //

  if (!user) return redirectToSignIn();

  const profile = await prisma.profile.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!profile) {
    const createProfile = await prisma.profile.create({
      data: {
        userId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.emailAddresses[0].emailAddress,
        imageUrl: user.imageUrl,
      },
    });

    return createProfile;
  }

  return profile;
}
