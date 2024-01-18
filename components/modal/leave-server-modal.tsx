"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";
import { CreateChannelModalT } from "@/schemas";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { Button } from "../ui/button";
import queryString from "query-string";

export default function LeaveServerModal() {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const { onClose, openModal, isOpen, server } = useModal();

  //   Form

  async function handleDeleteServer() {
    try {
      setIsUpdating(true);
      const query = queryString.stringifyUrl({
        url: "/api/server/leave",
        query: {
          serverId: server?.id,
        },
      });
      await axios.patch(query);
      router.refresh();
      window.location.reload();
    } catch (err) {
      console.log(err);
    } finally {
      setIsUpdating(false);
    }
  }

  function handleClose() {
    onClose();
  }
  const hasOpened = isOpen && openModal === "leaveServer";

  return (
    <Dialog open={hasOpened} onOpenChange={handleClose}>
      <DialogContent className="dark:bg-[#36393e]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Leave server
          </DialogTitle>
        </DialogHeader>

        <div className="text-center text-sm">
          This action cannot be undone. Are you sure you want to leave the
          server{" "}
          <span className="text-purple-600 text-xl"># {server?.name}</span>
        </div>

        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handleClose} disabled={isUpdating}>
            Cancel
          </Button>
          <Button onClick={handleDeleteServer} disabled={isUpdating}>
            Leave
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
