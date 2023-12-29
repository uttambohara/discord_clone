import ServerSidebar from "@/components/navigation/server/server-sidebar";
import currentProfile from "@/lib/current-profile";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";

export default async function ServerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) {
  const currUser = await currentProfile();

  // If unknown users accesses it, they will be redirected by the middleware
  // than initial profile
  // this will never be null
  const server = await prisma.server.findFirst({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: currUser.id,
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

  if (!server) redirect("/");

  const role = server.members.find((member) => member.profileId == currUser.id)
    ?.role;

  return (
    <div className="grid h-screen grid-cols-[210px_1fr]">
      <ServerSidebar server={server} role={role} />
      <main>{children}</main>
    </div>
  );
}
