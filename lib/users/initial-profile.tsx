import { redirect } from "next/navigation";
import { prisma } from "../prisma";
import currentUser from "@/lib/current-user";

export default async function initialProfile() {
  const user = await currentUser();
  if (!user) return redirect("/auth/login");

  const existingProfile = await prisma.profile.findFirst({
    where: {
      email: user.email,
    },
  });

  if (!existingProfile) {
    const createdInitialProfile = await prisma.profile.create({
      data: {
        userId: user.id,
        name: user.name,
        email: user.email,
        imageUrl: user.image,
      },
    });

    return createdInitialProfile;
  }

  return existingProfile;
}
