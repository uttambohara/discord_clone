import ServerSidebar from "@/components/sidebar/server/server-sidebar";
import currentProfile from "@/lib/current-profile";
import { prisma } from "@/lib/prisma";
import { redirectToSignUp } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function ServerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) {
  const currUser = await currentProfile();
  if (!currUser) return redirectToSignUp();

  const server = await prisma.server.findFirst({
    where: {
      id: params.serverId,
      profileId: currUser.userId,
    },
    include: {
      members: {
        include: {
          profile: true,
        },
      },
    },
  });

  if (!server) redirect("/");
  return (
    <div className="grid grid-cols-[200px_1fr] h-screen">
      <ServerSidebar server={server} />
      <main>{children}</main>
    </div>
  );
}
