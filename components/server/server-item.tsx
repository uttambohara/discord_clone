import { useModal } from "@/hooks/use-modal";
import { ServerWithMembersProfile } from "@/types";
import { Channel } from "@prisma/client";
import { Edit, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { MouseEvent } from "react";

interface ServerItem {
  label: string;
  icon: React.ReactNode;
  server: ServerWithMembersProfile;
  channel: Channel;
}

export default function ServerItem({
  label,
  icon,
  server,
  channel,
}: ServerItem) {
  const params = useParams();
  const router = useRouter();
  const { onOpen } = useModal();

  function handleEdit(e: MouseEvent) {
    e.stopPropagation();
    onOpen("editChannel", server, undefined, channel);
  }

  function handleDelete(e: MouseEvent) {
    e.stopPropagation();
    onOpen("deleteChannel", server, undefined, channel);
  }

  function handleChannelClick() {
    router.push(`/server/${params.serverId}/channel/${channel.id}`);
  }
  return (
    <div
      className="flex items-center justify-between py-2.5 hover:bg-slate-50 rounded-md cursor-pointer group dark:hover:bg-black/40"
      onClick={handleChannelClick}
    >
      <div className="flex items-center gap-1 px-3">
        {icon}
        {label}
      </div>

      <div className="hidden group-hover:block">
        <div className="flex items-center gap-1">
          <Edit size={16} onClick={handleEdit} />
          <Trash size={16} onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
}
