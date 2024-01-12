"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/useModal";
import { ExtendedServerProps } from "@/types";

import { MemberRole } from "@prisma/client";
import {
  ChevronDown,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";

interface ServerDropdownProps {
  role?: MemberRole;
  serverDetailsInServerSidebar: ExtendedServerProps;
}

export default function ServerDropdown({
  role,
  serverDetailsInServerSidebar,
}: ServerDropdownProps) {
  const { isOpen, onOpen, openModal } = useModal();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = role === MemberRole.MODERATOR || isAdmin;
  const isGuest = role === MemberRole.GUEST;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-b border-slate-200 py-2.5 px-4 w-full outline-none hover:bg-slate-100 shadow-sm dark:hover:bg-white/10 flex justify-between items-center dark:border-white/20">
        <div className="text-[1rem]">{serverDetailsInServerSidebar.name}</div>
        <ChevronDown size={16} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[12rem]">
        {isModerator && (
          <DropdownMenuItem
            className="flex items-center justify-between text-purple-600"
            onSelect={() =>
              onOpen("inviteFriends", serverDetailsInServerSidebar)
            }
          >
            Invite Friends
            <UserPlus size={18} />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            className="flex items-center justify-between"
            onClick={() =>
              onOpen("serverSettings", serverDetailsInServerSidebar)
            }
          >
            Server Settings
            <Settings size={18} />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            className="flex items-center justify-between"
            onClick={() =>
              onOpen("manageMembers", serverDetailsInServerSidebar)
            }
          >
            Manage Members
            <Users size={18} />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem className="flex items-center justify-between">
            Create Channel
            <PlusCircle size={18} />
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        {isAdmin && (
          <DropdownMenuItem className="flex items-center justify-between text-red-700">
            Delete Server
            <Trash size={18} />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
