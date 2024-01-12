import { prisma } from "@/lib/prisma";
import currentUser from "../auth/currentUser";

export default async function initialProfile() {
  const user = await currentUser();
  if (!user) return null;

  const existingProfile = await prisma.profile.findFirst({
    where: {
      email: user.email,
    },
  });

  if (!existingProfile) {
    const newProfile = await prisma.profile.create({
      data: {
        name: user.name,
        email: user.email,
        imageUrl: user.image,
        userId: user.id,
      },
    });

    return newProfile;
  }

  return existingProfile;
}
