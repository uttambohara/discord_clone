import { ModeToggle } from "@/components/mode-toggle";
import { TooltipComp } from "@/components/tooltip";
import { Separator } from "@/components/ui/separator";
import { UserButton, redirectToSignUp } from "@clerk/nextjs";
import { Plus } from "lucide-react";

import { prisma } from "@/lib/prisma";
import initialProfile from "@/lib/initial-profile";
import SidebarList from "./sidebar-list";

export default async function MainLayoutSidebar() {
  const currUser = await initialProfile();

  if (!currUser) return redirectToSignUp();

  const servers = await prisma.server.findMany({
    where: {
      members: {
        some: {
          profileId: currUser.id,
        },
      },
    },
  });

  return (
    <div className="border-r border-gray-200 flex flex-col items-center py-2 dark:bg-slate-700/20 dark:border-gray-800/40 gap-4">
      {/* Add a server */}
      <TooltipComp content="Add a server">
        <div className="group">
          <div className="bg-slate-200 rounded-full h-12 w-12 flex items-center justify-center group-hover:bg-green-500 cursor-pointer dark:bg-slate-800 group-hover:rounded-[6px] transition">
            <Plus className="text-green-600 group-hover:text-white" />
          </div>
        </div>
      </TooltipComp>

      <Separator />

      <SidebarList servers={servers} />

      <div className="mt-auto flex flex-col items-center gap-3">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-10 w-10",
            },
          }}
        />
      </div>
    </div>
  );
}
