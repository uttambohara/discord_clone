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

export default function LeaveServerModal() {
  const [isUpdating, setIsUpdating] = useState(false);
  const { isOpen, onOpen, openModal, onClose, data } = useModal();
  const router = useRouter();

  // ...

  async function handleLeaveServer() {
    try {
      setIsUpdating(true);
      const url = queryString.stringifyUrl({
        url: "/api/server/leave",
        query: {
          serverId: data.server?.id,
        },
      });
      await axios.patch(url);
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

  const hasOpened = isOpen && openModal === "leaveServer";
  return (
    <Dialog open={hasOpened} onOpenChange={handleClose}>
      <DialogContent className="dark:bg-[#282b30]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Leave server
          </DialogTitle>
          <DialogDescription>
            <span className="mb-3 text-center">
              Are you sure you wish to leave
              <span className="font-bold text-xl"> #{data?.server?.name}</span>.
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
            onClick={handleLeaveServer}
            disabled={isUpdating}
          >
            Leave
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
