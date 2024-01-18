"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal";
import { ServerWithMembersProfile } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import {
  Activity,
  ChevronDown,
  Hash,
  PlusCircle,
  Search,
  Settings,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Trash,
  UserPlus,
  Users,
  Video,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import ServerSearch from "./server-search";

interface ServerSidebarProps {
  serverUserIsTheMemberOf: ServerWithMembersProfile;
  role?: MemberRole;
}

const channelTypeIconMap = {
  [ChannelType.TEXT]: <Hash size={16} color="gray" />,
  [ChannelType.AUDIO]: <Activity size={16} color="gray" />,
  [ChannelType.VIDEO]: <Video size={16} color="gray" />,
};

const memberRoleIconMap = {
  [MemberRole.GUEST]: <Shield size={16} color="gray" />,
  [MemberRole.MODERATOR]: <ShieldCheck size={16} color="gray" />,
  [MemberRole.ADMIN]: <ShieldAlert size={16} color="gray" />,
};

export default function ServerSidebar({
  serverUserIsTheMemberOf,
  role,
}: ServerSidebarProps) {
  const { onOpen } = useModal();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = role === MemberRole.MODERATOR || isAdmin;
  const isGuest = role === MemberRole.GUEST;

  const textChannel = serverUserIsTheMemberOf.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannel = serverUserIsTheMemberOf.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannel = serverUserIsTheMemberOf.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

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

      <div className="flex items-center justify-center">
        <button
          className="flex items-center justify-between px-3 w-[90%] py-2.5 border-b border-slate-200 dark:border-white/20"
          onClick={() => setOpen(true)}
        >
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Search size={16} />
            <span>Search</span>
          </div>
          <Badge className="select-none text-xs pointer-events-none">
            <kbd>⌘k</kbd>
          </Badge>
        </button>

        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <ServerSearch
              commandData={[
                {
                  name: "Text channel",
                  type: "channel",
                  data: textChannel.map((channel) => ({
                    id: channel.id,
                    label: channel.name,
                    icon: channelTypeIconMap[channel.type],
                  })),
                },
                {
                  name: "Audio channel",
                  type: "channel",
                  data: audioChannel.map((channel) => ({
                    id: channel.id,
                    label: channel.name,
                    icon: channelTypeIconMap[channel.type],
                  })),
                },
                {
                  name: "Video channel",
                  type: "channel",
                  data: videoChannel.map((channel) => ({
                    id: channel.id,
                    label: channel.name,
                    icon: channelTypeIconMap[channel.type],
                  })),
                },
                {
                  name: "Members",
                  type: "member",
                  data: serverUserIsTheMemberOf.members.map((member) => ({
                    id: member.id,
                    label: member.profile?.name!,
                    icon: memberRoleIconMap[member.role],
                  })),
                },
              ]}
            />
          </CommandList>
        </CommandDialog>
      </div>
    </div>
  );
}
