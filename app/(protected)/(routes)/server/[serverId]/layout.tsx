import ServerDropdown from "@/components/navigation/server-dropdown";
import currentProfile from "@/data/users/current-profile";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function ServerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) {
  //
  const currentUser = await currentProfile();
  if (!currentUser) return redirect("/auth/login");

  // of current user
  const serverDetailsInServerSidebar = await prisma.server.findFirst({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: currentUser.id,
        },
      },
    },
    include: {
      members: {
        include: {
          profile: true,
        },
      },
    },
  });

  if (!serverDetailsInServerSidebar) return null;

  const role = serverDetailsInServerSidebar.members.find(
    (member) => member.profileId === currentUser.id
  )?.role;

  return (
    <div className="grid grid-cols-[250px_1fr] ">
      <div className="border-r border-slate-200 dark:border-white/10 h-screen dark:bg-[#36393e]">
        <ServerDropdown
          role={role}
          serverDetailsInServerSidebar={serverDetailsInServerSidebar}
        />
      </div>
      <main>{children}</main>
    </div>
  );
}
