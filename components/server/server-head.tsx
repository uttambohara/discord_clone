"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal";
import { ServerWithMembersWithChannels } from "@/types";
import { MemberRole } from "@prisma/client";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  ChevronDown,
  DoorOpen,
  LogOut,
  Settings,
  Trash,
  UserRound,
  Users,
} from "lucide-react";

interface ServerHeadProps {
  serverUserIsThePartOf: ServerWithMembersWithChannels;
  profileId: string;
}

export default function ServerHead({
  serverUserIsThePartOf,
  profileId,
}: ServerHeadProps) {
  const { onOpen } = useModal();

  const role = serverUserIsThePartOf.members.find(
    (member) => member.profileId === profileId
  )?.role;

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role == MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full border-b border-zinc-300 dark:border-zinc-200/10 p-2 flex items-center justify-between px-4">
        {serverUserIsThePartOf.name}
        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[14rem]">
        {/*  */}
        {isModerator && (
          <DropdownMenuItem
            className="flex items-center justify-between text-violet-700"
            onSelect={() =>
              onOpen("invitePeople", { server: serverUserIsThePartOf })
            }
          >
            <span>Invite people</span>
            <UserRound size={15} />
          </DropdownMenuItem>
        )}

        {isAdmin && (
          <DropdownMenuItem
            className="flex items-center justify-between"
            onSelect={() =>
              onOpen("serverSetting", { server: serverUserIsThePartOf })
            }
          >
            <span>Server settings</span>
            <Settings size={15} />
          </DropdownMenuItem>
        )}

        {isAdmin && (
          <DropdownMenuItem
            className="flex items-center justify-between"
            onSelect={() =>
              onOpen("manageMembers", { server: serverUserIsThePartOf })
            }
          >
            <span>Manage Members</span>
            <Users size={15} />
          </DropdownMenuItem>
        )}

        {isAdmin && (
          <DropdownMenuItem
            className="flex items-center justify-between"
            onSelect={() =>
              onOpen("createChannel", { server: serverUserIsThePartOf })
            }
          >
            <span>Create Channels</span>
            <DoorOpen size={15} />
          </DropdownMenuItem>
        )}

        <Separator />

        {isAdmin && (
          <DropdownMenuItem
            className="flex items-center justify-between text-red-700"
            onSelect={() =>
              onOpen("deleteServer", { server: serverUserIsThePartOf })
            }
          >
            <span>Delete server</span>
            <Trash size={15} />
          </DropdownMenuItem>
        )}

        {!isAdmin && (
          <DropdownMenuItem
            className="flex items-center justify-between text-red-700"
            onSelect={() =>
              onOpen("leaveServer", { server: serverUserIsThePartOf })
            }
          >
            <span>Leave server</span>
            <LogOut size={15} />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
