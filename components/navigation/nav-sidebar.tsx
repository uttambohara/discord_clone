import initialProfile from "@/data/initial-user";
import { prisma } from "@/lib/prisma";
import { ModeToggle } from "../mode-toggle";
import NavHead from "./nav-head";
import NavList from "./nav-list";
import LogoutButton from "./nav-logout";

export default async function NavSidebar() {
  const initailProfile = await initialProfile();

  const serverUserIsThePartOf = await prisma.server.findMany({
    where: {
      members: {
        some: {
          profileId: initailProfile.id,
        },
      },
    },
  });

  return (
    <div className="border-r border-slate-200 dark:border-zinc-200/10 flex flex-col items-center py-3 dark:bg-[#1e2124] bg-zinc-100 gap-4">
      {/* Head */}
      <NavHead />

      {/* Body */}
      <NavList serverUserIsThePartOf={serverUserIsThePartOf} />
      {/* Foot */}
      <div className="flex items-center flex-col mt-auto gap-3">
        <LogoutButton />
        <ModeToggle />
      </div>
    </div>
  );
}
