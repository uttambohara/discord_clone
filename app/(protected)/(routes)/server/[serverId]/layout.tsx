import ServerHead from "@/components/server/server-head";
import ServerSearch from "@/components/server/server-search";
import initialProfile from "@/data/initial-user";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function ServerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) {
  const currentUser = await initialProfile();

  const serverUserIsThePartOf = await prisma.server.findFirst({
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
      channels: true,
    },
  });

  if (!serverUserIsThePartOf) return redirect("/");

  console.log(serverUserIsThePartOf);

  return (
    <div className="grid grid-cols-[250px_1fr] h-full">
      <div className="border-r border-slate-200 bg-zinc-200 dark:border-zinc-200/10 dark:bg-[#282b30]">
        <ServerHead
          serverUserIsThePartOf={serverUserIsThePartOf}
          profileId={currentUser.id}
        />

        <ServerSearch
          serverUserIsThePartOf={serverUserIsThePartOf}
          profileId={currentUser.id}
        />
      </div>
      <main className="dark:bg-[#36393e]">{children}</main>
    </div>
  );
}
