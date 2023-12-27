"use client";

import { useModalStore } from "@/hooks/use-modal";
import { Plus } from "lucide-react";
import React, { forwardRef } from "react";

const AddButton = forwardRef(() => {
  const { onOpen } = useModalStore();
  return (
    <div className="group">
      <div
        className="h-11 w-11 bg-slate-300 flex items-center justify-center rounded-full group-hover:rounded-[12px] dark:bg-green-700"
        onClick={() => onOpen("createServer")}
      >
        <Plus className="text-green-700 dark:text-slate-200" />
      </div>
    </div>
  );
});

AddButton.displayName = "AddButton";
export default AddButton;
