"use client";

import { Server } from "@prisma/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal";
import { ChevronDown, Settings, User } from "lucide-react";

type ServerSidebarProps = {
  server: Server;
};

export default function ServerSidebar({ server }: ServerSidebarProps) {
  const { onOpen } = useModal();

  return (
    <div className="border-r border-gray-300  dark:border-gray-500/20">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center justify-between w-full px-3 py-3">
            <span className="text-[1rem]">{server.name}</span>
            <ChevronDown />
          </button>
        </DropdownMenuTrigger>
        <Separator />
        <DropdownMenuContent className="w-[12rem]">
          <DropdownMenuItem>
            <button
              className="flex items-center justify-between w-full px-1 text-indigo-700"
              onClick={() => onOpen("inviteFriends", server)}
            >
              <span>Invite friends</span>
              <User size={16} />
            </button>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <button
              className="flex items-center justify-between w-full px-1"
              onClick={() => onOpen("customizeServer", server)}
            >
              <span>Customize server</span>
              <Settings size={16} />
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
