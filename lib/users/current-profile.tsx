import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import currentUser from "@/lib/current-user";

export default async function currentProfile() {
  const user = await currentUser();
  if (!user) return redirect("/auth/login");

  const existingProfile = await prisma.profile.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!existingProfile) return null;

  return existingProfile;
}
