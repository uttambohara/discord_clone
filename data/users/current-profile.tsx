import { prisma } from "@/lib/prisma";
import currentUser from "../auth/currentUser";

export default async function currentProfile() {
  const user = await currentUser();

  if (!user) return null;

  const existingProfile = await prisma.profile.findFirst({
    where: {
      email: user.email,
    },
  });

  if (!existingProfile) return null;

  return existingProfile;
}
