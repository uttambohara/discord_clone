import DisplayModal from "@/components/modals/display-modal";
import initialProfile from "@/lib/initial-profile";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function page() {
  const currUser = await initialProfile();

  // check if the profile is a member of any server
  const server = await prisma.server.findFirst({
    where: {
      members: {
        some: {
          profileId: currUser?.userId,
        },
      },
    },
  });

  // server is the member
  if (server) return redirect(`/server/${server.id}`);

  //
  return <DisplayModal />;
}
