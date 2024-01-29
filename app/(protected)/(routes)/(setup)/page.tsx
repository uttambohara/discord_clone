import InitialServerModal from "@/components/modal/initial-server-modal";
import initialProfile from "@/data/initial-user";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Setup() {
  const currentUser = await initialProfile();
  const existingServer = await prisma.server.findFirst({
    where: {
      members: {
        some: {
          profileId: currentUser.id,
        },
      },
    },
  });

  if (existingServer) return redirect(`/server/${existingServer.id}`);

  return <InitialServerModal />;
}
