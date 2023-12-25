import ServerSidebar from "@/components/sidebar/server-sidebar/server-sidebar";
import currentProfile from "@/lib/current-profile";
import { prisma } from "@/lib/prisma";
import { redirectToSignUp } from "@clerk/nextjs";

export default async function ServerLayout({
  params,
  children,
}: {
  params: { serverId: string };
  children: React.ReactNode;
}) {
  const currUser = await currentProfile();
  if (!currUser) return redirectToSignUp();

  const server = await prisma.server.findFirst({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: currUser.id,
        },
      },
    },
  });

  if (!server) return redirectToSignUp();

  return (
    <div className="grid grid-cols-[200px_1fr] h-screen">
      <ServerSidebar server={server} />
      <main>{children}</main>
    </div>
  );
}
