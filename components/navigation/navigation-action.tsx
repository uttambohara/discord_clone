"use client";

import ToolTip from "@/components/tooltip";
import { useModal } from "@/hooks/useModal";
import { Plus } from "lucide-react";

export default function NavigationAction() {
  const { onOpen } = useModal();

  function handleOpenCreateModal() {
    onOpen("createServer");
  }

  return (
    <ToolTip label="Add a server" side="right" align="start">
      <div
        className="bg-slate-100 h-12 w-12 rounded-full grid place-content-center hover:rounded-[12px] cursor-pointer"
        onClick={handleOpenCreateModal}
      >
        <Plus color="green" />
      </div>
    </ToolTip>
  );
}
