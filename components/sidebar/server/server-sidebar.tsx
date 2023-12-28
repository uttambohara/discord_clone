"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";

export default function ServerSidebar() {
  const { onOpen } = useModal();
  return (
    <div className="border-r border-slate-200 dark:border-slate-200/10">
      <Button onClick={() => onOpen("manageMembers")}>Create channel</Button>
    </div>
  );
}
