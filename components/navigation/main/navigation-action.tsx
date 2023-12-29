"use client";

import TooltipEl from "@/components/tooltipEl";
import { useModal } from "@/hooks/useModal";
import { Plus } from "lucide-react";

export default function MainSidebarAddServer() {
  const { onOpen } = useModal();

  return (
    <TooltipEl content="Add a server">
      <div className="group">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-300 group-hover:rounded-[16px] dark:bg-green-500"
          onClick={() => onOpen("createServer")}
        >
          <Plus className="text-green-700 dark:text-slate-300" />
        </div>
      </div>
    </TooltipEl>
  );
}
