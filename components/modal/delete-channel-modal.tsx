"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";
import axios from "axios";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { useState } from "react";
import { Button } from "../ui/button";

export default function DeleteChannelModal() {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const { onClose, openModal, isOpen, server, channel } = useModal();

  //   Form

  async function handleDeleteServer() {
    try {
      setIsUpdating(true);
      const query = queryString.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      });
      await axios.delete(query);
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
  const hasOpened = isOpen && openModal === "deleteChannel";

  return (
    <Dialog open={hasOpened} onOpenChange={handleClose}>
      <DialogContent className="dark:bg-[#36393e]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Delete channel
          </DialogTitle>
        </DialogHeader>

        <div className="text-center text-sm">
          This action cannot be undone. Are you sure you want to delete{" "}
          <span className="text-purple-600 text-xl"># {channel?.name}</span>
        </div>

        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handleClose} disabled={isUpdating}>
            Cancel
          </Button>
          <Button onClick={handleDeleteServer} disabled={isUpdating}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
