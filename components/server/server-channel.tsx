"use client";

import { OpenModalType, useModal } from "@/hooks/use-modal";
import { Channel, ChannelType, MemberRole } from "@prisma/client";
import { Activity, Edit, Hash, Lock, Play, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { MouseEvent } from "react";

interface ServerChannelProps {
  type: ChannelType;
  channel: Channel;
  role?: MemberRole;
}

export const channelconMap = {
  [ChannelType.TEXT]: <Hash color="gray" />,
  [ChannelType.AUDIO]: <Activity color="gray" />,
  [ChannelType.VIDEO]: <Play color="gray" />,
};

export default function ServerChannel({
  type,
  channel,
  role,
}: ServerChannelProps) {
  const { onOpen } = useModal();
  const router = useRouter();

  const { serverId } = useParams();

  // TODO: handle propogation
  function handleClick() {
    router.push(`/server/${serverId}/channel/${channel.id}`);
  }

  function handleAction(
    e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>,
    actionName: OpenModalType
  ) {
    e.stopPropagation();

    onOpen(actionName, {
      channelData: {
        channelType: channel.channelType,
        channelName: channel.name,
        channelId: channel.id,
      },
    });
  }
  return (
    <div
      className="p-2 flex items-center justify-between group hover:bg-zinc-300  cursor-pointer rounded-md hover:dark-bg-zinc-300/10"
      onClick={handleClick}
    >
      <div className="flex items-center gap-1 text-sm">
        {channelconMap[channel.channelType]}
        <h2>{channel.name}</h2>
      </div>

      {role !== MemberRole.GUEST && (
        <>
          {channel.name === "general" ? (
            <Lock color="gray" size={16} />
          ) : (
            <div className="group-hover:flex items-center gap-1 hidden">
              <Edit
                size={16}
                color="gray"
                onClick={(e) => handleAction(e, "editChannel")}
              />
              <Trash
                size={16}
                color="gray"
                onClick={(e) => handleAction(e, "deleteChannel")}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
