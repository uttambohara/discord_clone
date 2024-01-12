import CreateServerModal from "@/components/modal/create-server-modal";
import initialProfile from "@/data/users/initial-profile";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Setup() {
  const initialUser = await initialProfile();
  if (!initialUser) return redirect("/auth/login");

  const userMemberOfTheServer = await prisma.server.findFirst({
    where: {
      members: {
        some: {
          profileId: initialUser.id,
        },
      },
    },
  });

  if (userMemberOfTheServer)
    return redirect(`/server/${userMemberOfTheServer.id}`);

  return <CreateServerModal />;
}
