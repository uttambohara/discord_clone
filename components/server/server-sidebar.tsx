"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal";
import { ServerWithMembersProfile } from "@/types";
import { MemberRole } from "@prisma/client";
import {
  ChevronDown,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";

interface ServerSidebarProps {
  serverUserIsTheMemberOf: ServerWithMembersProfile;
  role?: MemberRole;
}

export default function ServerSidebar({
  serverUserIsTheMemberOf,
  role,
}: ServerSidebarProps) {
  const { onOpen } = useModal();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = role === MemberRole.MODERATOR || isAdmin;
  const isGuest = role === MemberRole.GUEST;

  return (
    <div className="border-r border-slate-100 h-full dark:border-white/10 dark:bg-[#282b30]">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full outline-none">
          <div className="border-b border-slate-100 h-full dark:border-white/10 w-full py-2.5 px-5 flex items-center justify-between shadow-sm">
            {serverUserIsTheMemberOf.name}
            <ChevronDown size={18} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[12rem]">
          {isModerator && (
            <DropdownMenuItem
              className="flex items-center justify-between text-purple-600 cursor-pointer"
              onClick={() => onOpen("invitePeople", serverUserIsTheMemberOf)}
            >
              <span>Invite people</span>
              <UserPlus size={16} />
            </DropdownMenuItem>
          )}

          {isAdmin && (
            <DropdownMenuItem
              className="flex items-center justify-between cursor-pointer"
              onClick={() => onOpen("serverSetting", serverUserIsTheMemberOf)}
            >
              <span>Server settings</span>
              <Settings size={16} />
            </DropdownMenuItem>
          )}

          {isAdmin && (
            <DropdownMenuItem
              className="flex items-center justify-between cursor-pointer"
              onClick={() => onOpen("manageMember", serverUserIsTheMemberOf)}
            >
              <span>Manage Members</span>
              <Users size={16} />
            </DropdownMenuItem>
          )}

          {isModerator && (
            <DropdownMenuItem
              className="flex items-center justify-between cursor-pointer"
              onClick={() => onOpen("createChannel", serverUserIsTheMemberOf)}
            >
              <span>Create channel</span>
              <PlusCircle size={16} />
            </DropdownMenuItem>
          )}
          <Separator />

          {isAdmin && (
            <DropdownMenuItem
              className="flex items-center justify-between text-red-700 cursor-pointer"
              onClick={() => onOpen("deleteServer", serverUserIsTheMemberOf)}
            >
              <span>Delete server</span>
              <Trash size={16} />
            </DropdownMenuItem>
          )}

          {!isAdmin && (
            <DropdownMenuItem
              className="flex items-center justify-between text-red-700 cursor-pointer"
              onClick={() => onOpen("leaveServer", serverUserIsTheMemberOf)}
            >
              <span>Leave server</span>
              <Trash size={16} />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
