import currentUser from "@/lib/currentUser";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function currentProfile() {
  const user = await currentUser();

  if (!user) return redirect("/auth/login");

  const currentProfile = await prisma.profile.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!currentProfile) return null;

  return currentProfile;
}
