import ServerSidebar from "@/components/server/server-sidebar";
import { prisma } from "@/lib/prisma";
import currentProfile from "@/lib/users/current-profile";
import { redirect } from "next/navigation";
import React from "react";

export default async function ServerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) {
  const { serverId } = params;

  const currentUser = await currentProfile();
  if (!currentUser) return redirect("/");

  const serverUserIsTheMemberOf = await prisma.server.findFirst({
    where: {
      id: serverId,
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
      channels: true,
    },
  });

  if (!serverUserIsTheMemberOf) return redirect("/");

  const role = serverUserIsTheMemberOf.members.find(
    (member) => member.profileId === currentUser.id
  )?.role;

  return (
    <div className="grid grid-cols-[230px_1fr] h-full">
      <ServerSidebar
        serverUserIsTheMemberOf={serverUserIsTheMemberOf}
        role={role}
      />
      <main className="dark:bg-[#36393e]">{children}</main>
    </div>
  );
}
