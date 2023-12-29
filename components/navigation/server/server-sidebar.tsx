"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/useModal";
import { ServerWithMemberWithProfile } from "@/type";
import { MemberType } from "@prisma/client";
import { ChevronDown, TicketIcon } from "lucide-react";

type ServerSidebarProps = {
  server: ServerWithMemberWithProfile;
  role: MemberType | undefined;
};

export default function ServerSidebar({ server, role }: ServerSidebarProps) {
  // hook
  const { onOpen } = useModal();

  //
  const isAdmin = role === MemberType.ADMIN;
  const isModerator = isAdmin || role === MemberType.MODEARTOR;

  return (
    <div className="border-r border-gray-200">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex w-full items-center justify-between border-b border-slate-200 px-4 py-3 outline-none">
          <span>{server.name}</span>
          <ChevronDown size={18} />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[11rem]">
          {isAdmin && (
            <DropdownMenuItem
              className="flex items-center justify-between px-2"
              onClick={() => onOpen("invitePeople", server)}
            >
              <span>Invite people</span>
              <TicketIcon size={18} />
            </DropdownMenuItem>
          )}

          {/* <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
