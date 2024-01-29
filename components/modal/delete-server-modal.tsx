"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal";
import axios from "axios";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { useState } from "react";
import { Button } from "../ui/button";

export default function DeleteServerModal() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const { isOpen, onOpen, openModal, onClose, data } = useModal();
  const router = useRouter();

  // ...
  const origin = typeof window !== undefined ? window.location.origin : "";
  const invitationLink = `${origin}/invite-code/${data?.server?.token}`;

  async function handleServerDeletion() {
    try {
      setIsUpdating(true);
      const url = queryString.stringifyUrl({
        url: "/api/server/delete",
        query: {
          serverId: data.server?.id,
        },
      });
      await axios.delete(url);
      router.refresh();
      handleClose();
    } catch (err) {
      console.log(err);
    } finally {
      setIsUpdating(false);
    }
  }
  function handleClose() {
    onClose();
  }

  const hasOpened = isOpen && openModal === "deleteServer";
  return (
    <Dialog open={hasOpened} onOpenChange={handleClose}>
      <DialogContent className="dark:bg-[#282b30]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Delete Server
          </DialogTitle>
          <DialogDescription>
            <span className="mb-3 text-center">
              Are you sure you wish to delete
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
