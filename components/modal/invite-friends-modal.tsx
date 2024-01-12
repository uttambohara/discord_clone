"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModal";
import useOrigin from "@/hooks/useOrigin";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

export default function InviteFriendsModal() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  const { onOpen, isOpen, openModal, onClose, data } = useModal();
  const router = useRouter();
  const origin = useOrigin();

  const invitationLink = `${origin}/invite/${data?.inviteCode}`;

  // form
  async function handleCreateANewInvitationCode() {
    try {
      setIsUpdating(true);
      const tokenUpdatedServer = await axios.patch(
        `/api/server/${data?.id}/invite`
      );

      console.log({ tokenUpdatedServer });
      router.refresh();
      onOpen("inviteFriends", tokenUpdatedServer.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsUpdating(false);
    }
  }

  function handleCopyLink() {
    setIsCopying(true);
    navigator.clipboard.writeText(invitationLink);
    setTimeout(() => {
      setIsCopying(false);
    }, 2000);
  }

  const hasOpened = isOpen && openModal === "inviteFriends";

  return (
    <Dialog open={hasOpened} onOpenChange={onClose}>
      <DialogContent className="dark:bg-[#36393e]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Invite friends
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm">Invite server link</h3>
            <div className="flex items-center gap-3">
              <Input
                value={invitationLink}
                readOnly
                disabled={isCopying || isUpdating}
              />
              <Button
                variant="outline"
                size="sm"
                className="disabled:bg-slate-300"
                onClick={handleCopyLink}
                disabled={isCopying}
              >
                {isCopying ? <Check size={16} /> : <Copy size={16} />}
              </Button>
            </div>
          </div>

          <button
            className="flex items-center gap-1 text-muted-foreground text-sm hove:underline hover:underline-offset-4"
            onClick={handleCreateANewInvitationCode}
            disabled={isUpdating}
          >
            <RefreshCcw size={17} />
            Generate a link
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
