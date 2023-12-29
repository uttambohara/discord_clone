import CreateServerModal from "@/components/modal/invite-modal";
import initialProfile from "@/lib/initial-profile";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Home() {
  const currUser = await initialProfile();
  // currUser is never null
  // because the initial profile will be created...
  const server = await prisma.server.findFirst({
    where: {
      members: {
        some: {
          profileId: currUser.id,
        },
      },
    },
  });

  if (server) return redirect(`/server/${server.id}`);

  return <CreateServerModal />;
}
