"use client";

import { useModal } from "@/hooks/use-modal";
import { ServerWithMembersWithChannels } from "@/types";
import { MemberRole } from "@prisma/client";
import { Plus, Settings } from "lucide-react";

interface ServerSectionProps {
  role?: MemberRole;
  heading: string;
  type: "member" | "channel";
  server: ServerWithMembersWithChannels;
}

export default function ServerSection({
  role,
  heading,
  type,
  server,
}: ServerSectionProps) {
  const { onOpen } = useModal();

  return (
    <div className="flex items-center justify-between p-1">
      <span> {heading}</span>

      {type === "channel" && role === MemberRole.ADMIN && (
        <Plus
          size={18}
          onClick={() => onOpen("createChannel", { server })}
          className="cursor-pointer"
        />
      )}
      {type === "member" && role === MemberRole.ADMIN && (
        <Settings
          size={18}
          className="cursor-pointer"
          onClick={() => onOpen("manageMembers", { server })}
        />
      )}
    </div>
  );
}
