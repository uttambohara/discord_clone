"use client";
import React from "react";
import ToolTip from "../tooltip";
import { Plus } from "lucide-react";
import { useModal } from "@/hooks/use-modal";

export default function NavHead() {
  const { onOpen } = useModal();
  return (
    <ToolTip label="Add a server">
      <span
        className="bg-slate-100 h-12 w-12 rounded-full flex items-center justify-center cursor-pointer hover:rounded-[12px]"
        onClick={() => onOpen("createServer")}
      >
        <Plus className="text-emerald-600" />
      </span>
    </ToolTip>
  );
}
