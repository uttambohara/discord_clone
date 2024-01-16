import { prisma } from "@/lib/prisma";
import currentProfile from "@/lib/users/current-profile";
import { redirect } from "next/navigation";

export default async function Server({
  params,
}: {
  params: { serverId: string };
}) {
  const { serverId } = params;

  // Authorization
  const currentUser = await currentProfile();
  if (!currentUser) return redirect("/auth/login");

  //
  const userMemberOfTheServer = await prisma.server.findFirst({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: currentUser.id,
        },
      },
    },
  });

  if (!userMemberOfTheServer) return redirect("/");

  return <div>Server</div>;
}
