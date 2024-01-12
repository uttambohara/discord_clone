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

import {
  ChevronDown,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";

interface ServerDropdownProps {
  serverDetailsInServerSidebar: ExtendedServerProps;
}

export default function ServerDropdown({
  serverDetailsInServerSidebar,
}: ServerDropdownProps) {
  const { isOpen, onOpen, openModal } = useModal();
  //
  const isAdmin = serverDetailsInServerSidebar.members[0].role === "ADMIN";
  const isModerator =
    serverDetailsInServerSidebar.members[0].role === "MODERATOR";
  const isGuest = serverDetailsInServerSidebar.members[0].role === "GUEST";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-b border-slate-200 p-3 w-full outline-none hover:bg-slate-100 dark:hover:bg-white/10 flex justify-between items-center dark:border-white/20">
        <div>{serverDetailsInServerSidebar.name}</div>
        <ChevronDown size={16} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[12rem]">
        {(isAdmin || isModerator) && (
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
        {(isAdmin || isModerator) && (
          <DropdownMenuItem className="flex items-center justify-between">
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
