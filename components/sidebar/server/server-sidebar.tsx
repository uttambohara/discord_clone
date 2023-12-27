"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModalStore } from "@/hooks/use-modal";
import { ServerWithMemberWithProfile } from "@/types/types";
import { MemberType } from "@prisma/client";
import { ChevronDown, UserPlus } from "lucide-react";

type ServerSidebarProps = {
  server: ServerWithMemberWithProfile;
};

export default function ServerSidebar({ server }: ServerSidebarProps) {
  const { onOpen, data } = useModalStore();

  const isAdmin = server?.members?.[0]?.role === MemberType.ADMIN;
  const isModerator =
    isAdmin || server?.members?.[0]?.role === MemberType.MODERATOR;

  return (
    <div className="border-r border-gray-200 flex flex-col  items-center gap-4 dark:border-slate-100/20">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center w-full outline-none justify-between px-2 py-3 border-b border-slate-200 dark:border-slate-200/10">
          <span>{server.name}</span>
          <ChevronDown size={17} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[10rem]">
          {/* Invite friends */}

          {isModerator && (
            <DropdownMenuItem
              className="flex items-center justify-between px-3 text-indigo-700"
              onClick={() => onOpen("inviteFriends", server)}
            >
              <span>Invite friends</span>
              <UserPlus size={17} />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
