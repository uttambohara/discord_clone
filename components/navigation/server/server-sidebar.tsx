"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/useModal";
import { ServerWithMemberWithProfile } from "@/type";
import { MemberType } from "@prisma/client";
import {
  ChevronDown,
  PlusCircle,
  TicketIcon,
  Trash,
  Users,
} from "lucide-react";

type ServerSidebarProps = {
  server: ServerWithMemberWithProfile;
  role: MemberType | undefined;
};

export default function ServerSidebar({ server, role }: ServerSidebarProps) {
  // hook
  const { onOpen } = useModal();

  //
  const isAdmin = role === MemberType.ADMIN;
  const isModerator = isAdmin || role === MemberType.MODERATOR;

  return (
    <div className="border-r border-gray-200">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex w-full items-center justify-between border-b border-slate-200 px-4 py-3 outline-none">
          <span>{server.name}</span>
          <ChevronDown size={18} />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[11rem]">
          {isModerator && (
            <DropdownMenuItem
              className="flex items-center justify-between px-2"
              onClick={() => onOpen("invitePeople", server)}
            >
              <span>Invite people</span>
              <TicketIcon size={18} />
            </DropdownMenuItem>
          )}

          {isAdmin && (
            <DropdownMenuItem
              className="flex items-center justify-between px-2"
              onClick={() => onOpen("manageMembers", server)}
            >
              <span>Manage members</span>
              <Users size={18} />
            </DropdownMenuItem>
          )}

          {isModerator && (
            <DropdownMenuItem
              className="flex items-center justify-between px-2"
              onClick={() => onOpen("createChannel", server)}
            >
              <span>Create channel</span>
              <PlusCircle size={18} />
            </DropdownMenuItem>
          )}

          <Separator />

          {isAdmin && (
            <DropdownMenuItem
              className="flex items-center justify-between px-2 text-red-600"
              onClick={() => onOpen("deleteServer", server)}
            >
              <span>Delete server</span>
              <Trash size={18} />
            </DropdownMenuItem>
          )}

          {!isAdmin && (
            <DropdownMenuItem
              className="flex items-center justify-between px-2 text-red-600"
              onClick={() => onOpen("leaveServer", server)}
            >
              <span>Leave server</span>
              <Trash size={18} />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
