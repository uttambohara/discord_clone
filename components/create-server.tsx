"use client";

import { useModal } from "@/hooks/use-modal";
import { Plus } from "lucide-react";

export default function CreateServer() {
  const { onOpen } = useModal();

  return (
    <div className="group" onClick={() => onOpen("createServer")}>
      <div className="h-12 w-12 rounded-full bg-slate-400 flex items-center justify-center group-hover:rounded-[20px] cursor-pointer group-hover:bg-green-600">
        <Plus className="group-hover:text-slate-100 text-green-800" />
      </div>
    </div>
  );
}
