import currentProfile from "@/lib/current-profile";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function InviteFriend({
  params,
}: {
  params: { inviteCode: string };
}) {
  const currUser = await currentProfile();

  if (!currUser) return redirect("/");

  // If server already has a member, redirect otherwise add a new member
  //
  const server = await prisma.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: currUser.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/server/${server.id}`);
  }

  //  Create a member in the server if it doesn't exist
  const updatedServer = await prisma.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: {
          profileId: currUser.id,
        },
      },
    },
    include: {
      members: {
        include: {
          profile: true,
        },
      },
    },
  });

  redirect(`/server/${updatedServer.id}`);

  return null;
}
