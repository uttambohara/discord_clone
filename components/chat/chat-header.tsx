import { Hash } from "lucide-react";
import SocketIndicator from "../socket-indicator";

interface ChatHeaderProps {
  name: string;
  type: "channel" | "conversation";
}

export default function ChatHeader({ name, type }: ChatHeaderProps) {
  return (
    <div className="border-b border-slate-100 p-3 px-4 flex justify-between items-center dark:border-zinc-200/10">
      {type === "channel" && (
        <div className="flex items-center gap-1">
          <Hash size={25} />
          <h2 className="text-2xl text-gray-600">{name}</h2>
        </div>
      )}

      <div>
        <SocketIndicator />
      </div>
    </div>
  );
}
