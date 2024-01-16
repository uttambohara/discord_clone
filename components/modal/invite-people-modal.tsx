"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal";
import useOrigin from "@/hooks/use-origin";
import axios from "axios";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InvitePeopleModal() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  const router = useRouter();
  const { onClose, onOpen, openModal, isOpen, server } = useModal();
  const origin = useOrigin();

  const invitationLink = `${origin}/invite-code/${server?.inviteCode}`;

  async function handleGenerateNewLink() {
    try {
      setIsUpdating(true);
      const inviteCodeUpdatedServer = await axios.patch(
        `/api/server/${server?.id}/invite`
      );
      router.refresh();
      onOpen("invitePeople", inviteCodeUpdatedServer.data.server);
    } catch (err) {
      console.log(err);
    } finally {
      setIsUpdating(false);
    }
  }

  function handleCopy() {
    setIsCopying(true);
    navigator.clipboard.writeText(invitationLink);
    setTimeout(() => setIsCopying(false), 2000);
  }

  const hasOpened = isOpen && openModal === "invitePeople";

  function handleClose() {
    onClose();
  }

  return (
    <Dialog open={hasOpened} onOpenChange={handleClose}>
      <DialogContent className="dark:bg-[#36393e]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Invite friends
          </DialogTitle>
          <DialogDescription className="text-center">
            Send this invitation code to invite your friends to the server...
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-3">
          <Input
            value={invitationLink}
            readOnly
            disabled={isUpdating || isCopying}
          />
          {isCopying ? (
            <Check size={16} />
          ) : (
            <button
              className="border p-1 rounded-md cursor-pointer"
              onClick={handleCopy}
              disabled={isUpdating}
            >
              <Copy size={16} />
            </button>
          )}
        </div>

        <Button
          className="flex items-center text-sm gap-2 justify-start"
          variant={"link"}
          onClick={handleGenerateNewLink}
          disabled={isUpdating}
        >
          <p>Generate a new link</p>
          <RefreshCcw size={16} />
        </Button>
      </DialogContent>
    </Dialog>
  );
}
