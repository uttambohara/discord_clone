"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import queryString from "query-string";
import { useState } from "react";
import { Button } from "../ui/button";

export default function DeleteChannelModal() {
  const [isUpdating, setIsUpdating] = useState(false);
  const { isOpen, onOpen, openModal, onClose, data } = useModal();
  const router = useRouter();

  const { serverId } = useParams();

  // ...

  async function handleServerDeletion() {
    try {
      setIsUpdating(true);
      const url = queryString.stringifyUrl({
        url: "/api/channels/delete",
        query: {
          serverId: serverId,
          channelId: data?.channelData?.channelId,
        },
      });
      await axios.delete(url);
      router.refresh();
      onClose();
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
      <DialogContent className="dark:bg-[#282b30]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Delete Channel
          </DialogTitle>
          <DialogDescription>
            <span className="mb-3 text-center">
              Are you sure you wish to delete
              <span className="font-bold text-xl">
                {" "}
                {data?.channelData?.channelName}
              </span>
              . You cannot undo this action.
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between">
          <Button
            variant={"outline"}
            onClick={handleClose}
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleServerDeletion}
            disabled={isUpdating}
          >
            Confirm deletion
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
