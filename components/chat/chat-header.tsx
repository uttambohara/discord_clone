import { Hash } from "lucide-react";
import SocketStatus from "../socket-status";

interface ChatHeaderProps {
  type: "channel" | "member";
  label?: string;
}

export default function ChatHeader({ type, label }: ChatHeaderProps) {
  return (
    <div className="h-[4rem] border-b border-slate-200 flex items-center px-8 dark:border-white/10">
      <div className="flex items-center gap-1">
        {type === "channel" && <Hash size={30} color="gray" />}
        <h2 className="text-xl">{label}</h2>
      </div>

      <div className="ml-auto">
        <SocketStatus />
      </div>
    </div>
  );
}
