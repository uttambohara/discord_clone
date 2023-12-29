import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { prisma } from "./prisma";

export default async function initialProfile() {
  const currUser = await currentUser();

  if (!currUser) return redirectToSignIn();

  const profile = await prisma.profile.findFirst({
    where: {
      userId: currUser.id,
    },
  });

  if (profile) return profile;

  const createProfile = await prisma.profile.create({
    data: {
      userId: currUser.id,
      name: `${currUser.firstName} ${currUser.lastName}`,
      email: currUser.emailAddresses[0].emailAddress,
      imageUrl: currUser.imageUrl,
    },
  });

  return createProfile;
}
