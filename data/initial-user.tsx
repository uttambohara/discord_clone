import currentUser from "@/lib/currentUser";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function initialProfile() {
  const user = await currentUser();
  if (!user) return redirect("/auth/login");

  const currentProfile = await prisma.profile.findFirst({
    where: {
      email: user.email,
    },
  });

  if (!currentProfile) {
    const createdProfile = await prisma.profile.create({
      data: {
        name: user.name!,
        email: user.email,
        imageUrl: user.image,
        userId: user.id,
      },
    });

    return createdProfile;
  }

  return currentProfile;
}
