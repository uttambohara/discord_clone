import ServerModal from "@/components/modal/server-modal";
import initialProfile from "@/lib/initial-profile";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Home() {
  const currUser = await initialProfile();

  const server = await prisma.server.findFirst({
    where: {
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

  // This seperates admin from normal users
  return <ServerModal />;
}
