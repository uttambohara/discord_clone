import currentProfile from "@/data/users/current-profile";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Server({
  params,
}: {
  params: { serverId: string };
}) {
  const serverId = params.serverId;

  const currentUser = await currentProfile();
  if (!currentUser) return redirect("/auth/login");

  const userMemberOfTheServer = await prisma.server.findMany({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: currentUser.id,
        },
      },
    },
  });

  if (userMemberOfTheServer.length === 0) {
    return redirect("/");
  }

  return <div>{serverId}</div>;
}
