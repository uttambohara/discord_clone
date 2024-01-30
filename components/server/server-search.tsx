"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import { ServerWithMembersWithChannels } from "@/types";
import { ChannelType } from "@prisma/client";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";

import { channelconMap, roleIconMap } from "@/lib/icon-map";
import ServerSearchCommand from "./server-command";

interface ServerSearchProp {
  serverUserIsThePartOf: ServerWithMembersWithChannels;
  profileId: string;
}

export default function ServerSearch({
  serverUserIsThePartOf,
  profileId,
}: ServerSearchProp) {
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

  function handleSearchClick() {
    setOpen(true);
  }

  //
  const textChannels = serverUserIsThePartOf?.channels?.filter(
    (channel) => channel.channelType === ChannelType.TEXT
  );
  const audioChannels = serverUserIsThePartOf?.channels?.filter(
    (channel) => channel.channelType === ChannelType.AUDIO
  );
  const videoChannels = serverUserIsThePartOf?.channels?.filter(
    (channel) => channel.channelType === ChannelType.VIDEO
  );
  const members = serverUserIsThePartOf?.members.filter(
    (member) => member.profileId !== profileId
  );

  return (
    <div>
      <div
        className="mx-auto flex items-center w-[95%] gap-1 py-3 px-4 border-b border-slate-300 dark:border-zinc-200/10 justify-between"
        onClick={handleSearchClick}
      >
        <div className="flex items-center gap-1">
          <Search size={18} />
          <span className="text-sm text-slate-500">Search</span>
        </div>

        <Badge>⌘K</Badge>
      </div>
      <CommandDialog open={open} onOpenChange={() => setOpen(false)}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <ServerSearchCommand
            data={{
              heading: "Text channel",
              type: "channel",
              serverId: serverUserIsThePartOf.id,
              subData: textChannels?.map((channel) => ({
                id: channel.id,
                icon: channelconMap[channel.channelType],
                label: channel.name,
              })),
            }}
          />
          <ServerSearchCommand
            data={{
              heading: "Audio channel",
              serverId: serverUserIsThePartOf.id,
              type: "channel",
              subData: audioChannels?.map((channel) => ({
                id: channel.id,
                icon: channelconMap[channel.channelType],
                label: channel.name,
              })),
            }}
          />
          <ServerSearchCommand
            data={{
              heading: "Video channel",
              serverId: serverUserIsThePartOf.id,
              type: "channel",
              subData: videoChannels?.map((channel) => ({
                id: channel.id,
                icon: channelconMap[channel.channelType],
                label: channel.name,
              })),
            }}
          />
          <ServerSearchCommand
            data={{
              heading: "Members",
              serverId: serverUserIsThePartOf.id,
              type: "member",
              subData: members?.map((member) => ({
                id: member.id,
                icon: roleIconMap[member.role],
                label: member?.profile?.email!,
              })),
            }}
          />

          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </div>
  );
}
