"use client";

import { TooltipComp } from "@/components/tooltip";
import { Plus } from "lucide-react";
import React from "react";
import { useModal } from "@/hooks/use-modal";

export default function AddServerButton() {
  const { onOpen } = useModal();

  return (
    <TooltipComp content="Add a server">
      <button className="group" onClick={() => onOpen("createServer")}>
        <div className="bg-slate-200 rounded-full h-11 w-11 flex items-center justify-center group-hover:bg-green-500 cursor-pointer dark:bg-slate-800 group-hover:rounded-[6px] transition">
          <Plus className="text-green-600 group-hover:text-white" />
        </div>
      </button>
    </TooltipComp>
  );
}
