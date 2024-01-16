import { prisma } from "@/lib/prisma";
import currentProfile from "@/lib/users/current-profile";
import { redirect } from "next/navigation";

export default async function InviteCode({
  params,
}: {
  params: { inviteCode: string };
}) {
  console.log("Working...");
  const { inviteCode } = params;

  const currentUser = await currentProfile();
  if (!currentUser) return redirect("/auth/login");

  const checkIfInviteCodeExists = await prisma.server.findFirst({
    where: {
      inviteCode,
    },
  });

  if (!checkIfInviteCodeExists) return redirect("/");

  const addNewMemberInTheServer = await prisma.server.update({
    where: {
      inviteCode,
    },
    data: {
      members: {
        create: {
          profileId: currentUser.id,
        },
      },
    },
  });

  return redirect(`/server/${addNewMemberInTheServer.id}`);
}
