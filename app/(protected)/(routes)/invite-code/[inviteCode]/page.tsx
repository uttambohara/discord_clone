import initialProfile from "@/data/initial-user";
import { prisma } from "@/lib/prisma";
import { MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function InviteCode({
  params,
}: {
  params: { inviteCode: string };
}) {
  const currentUser = await initialProfile();

  const checkIfTokenExists = await prisma.server.findFirst({
    where: {
      token: params.inviteCode,
    },
  });

  if (!checkIfTokenExists) return redirect("/");

  const serverUserAlreadyIsTheMember = await prisma.server.findFirst({
    where: {
      token: params.inviteCode,
      members: {
        some: {
          profileId: currentUser.id,
        },
      },
    },
  });
  if (serverUserAlreadyIsTheMember)
    return redirect(`/server/${serverUserAlreadyIsTheMember.id}`);

  const serverUserHasBeenAddedOn = await prisma.server.update({
    where: {
      token: params.inviteCode,
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

  return redirect(`/server/${serverUserHasBeenAddedOn.id}`);
}
