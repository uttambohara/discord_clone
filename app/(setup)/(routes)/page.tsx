import { prisma } from "@/lib/prisma";
import { redirectToSignUp } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import CreateServer from "@/components/modals/create-server";
import currentProfile from "@/lib/current-profile";

export default async function Setup() {
  const currentUser = await currentProfile();

  if (!currentUser) return redirectToSignUp();

  const server = await prisma.server.findFirst({
    where: {
      members: {
        some: {
          profileId: currentUser.id,
        },
      },
    },
  });

  if (!server) return <CreateServer />;

  return redirect(`/server/${server.id}`);
}
