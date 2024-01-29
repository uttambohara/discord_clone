"use client";

import { useModal } from "@/hooks/use-modal";
import { Plus } from "lucide-react";
import React from "react";
import ToolTip from "../toolTip";

export default function NavHead() {
  const { onOpen } = useModal();
  return (
    <ToolTip label={"Add a server"}>
      <div
        className="bg-slate-200 flex items-center justify-center h-12 w-12 rounded-full hover:rounded-[12px] cursor-pointer"
        onClick={() => {
          onOpen("createServer");
        }}
      >
        <Plus color="darkgreen" />
      </div>
    </ToolTip>
  );
}
