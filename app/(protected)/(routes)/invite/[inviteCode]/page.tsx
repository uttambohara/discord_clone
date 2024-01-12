import currentProfile from "@/data/users/current-profile";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { MemberRole } from "@prisma/client";

export default async function InvitePage({
  params,
}: {
  params: { inviteCode: string };
}) {
  const currentUser = await currentProfile();
  if (!currentUser) return redirect("/auth/login");

  const existenceOfInviteCodeOnServer = await prisma.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
    },
  });

  if (!existenceOfInviteCodeOnServer) return redirect("/");

  const roleUpdatedServer = await prisma.server.update({
    where: {
      id: existenceOfInviteCodeOnServer.id,
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: {
          profileId: currentUser.id,
          role: MemberRole.GUEST,
        },
      },
    },
  });

  return redirect(`/server/${roleUpdatedServer.id}`);
}
