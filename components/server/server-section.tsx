import { useModal } from "@/hooks/use-modal";
import { ServerWithMembersProfile } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import { Plus, Settings } from "lucide-react";

interface ServerSectionProps {
  role?: MemberRole;
  label: string;
  type: "channel" | "member";
  server: ServerWithMembersProfile;
  channelType?: ChannelType;
}

export default function ServerSection({
  label,
  role,
  type,
  server,
  channelType,
}: ServerSectionProps) {
  const { onOpen } = useModal();

  function handleAddChannel(channelType?: ChannelType) {
    onOpen("createChannel", server, channelType);
  }

  function handleManageMember() {
    onOpen("manageMember", server);
  }

  return (
    <div className="flex items-center justify-between py-1">
      <h2>{label}</h2>
      <div className="cursor-pointer">
        {role !== MemberRole.GUEST && type === "channel" && (
          <Plus size={16} onClick={() => handleAddChannel(channelType)} />
        )}{" "}
        {type === "member" && (
          <Settings size={16} onClick={() => handleManageMember()} />
        )}
      </div>
    </div>
  );
}
