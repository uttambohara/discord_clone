import DisplayCreateServerModal from "@/components/modals/display-create-server-modal";
import currentProfile from "@/lib/initial-profile";
import { prisma } from "@/lib/prisma";
import { redirectToSignUp } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function page() {
  const currUser = await currentProfile();

  if (!currUser) return redirectToSignUp();

  // check if the profile is a member of any server
  const server = await prisma.server.findFirst({
    where: {
      members: {
        some: {
          profileId: currUser.userId,
        },
      },
    },
  });

  // server is the member
  if (server) return redirect(`/server/${server.id}`);

  //
  return <DisplayCreateServerModal />;
}
