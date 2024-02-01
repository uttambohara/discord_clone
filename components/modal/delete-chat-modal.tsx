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
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { useState } from "react";
import { Button } from "../ui/button";

export default function DeleteChatModal() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { isOpen, onOpen, openModal, onClose, data } = useModal();
  const router = useRouter();

  // ...

  async function handleServerDeletion() {
    const qs = queryString.stringifyUrl({
      url: `${data.channelData?.socketUrl}/${data.channelData?.postId}`,
      query: {
        ...data.channelData?.socketParams,
        profileId: data.channelData?.profileId,
      },
    });

    try {
      setIsUpdating(true);
      await axios.delete(qs);
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

  const hasOpened = isOpen && openModal === "deleteChat";
  return (
    <Dialog open={hasOpened} onOpenChange={handleClose}>
      <DialogContent className="dark:bg-[#282b30]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Delete Server
          </DialogTitle>
          <DialogDescription>
            <span className="mb-3 text-center">
              Are you sure, you wish to delete this chat.
              <span className="font-bold text-xl"> {data?.server?.name}</span>.
              You cannot undo this action.
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
