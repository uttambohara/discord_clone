import CreateServer from "@/components/modal/create-server";
import { prisma } from "@/lib/prisma";
import initialProfile from "@/lib/users/initial-profile";
import { redirect } from "next/navigation";

export default async function Home() {
  //
  const initialUser = await initialProfile();

  //
  const serverInitialUserIsThePartOf = await prisma.server.findFirst({
    where: {
      members: {
        some: {
          profileId: initialUser.id,
        },
      },
    },
  });

  if (serverInitialUserIsThePartOf)
    return redirect(`/server/${serverInitialUserIsThePartOf.id}`);

  return <CreateServer />;
}
