"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useModalStore } from "@/hooks/use-modal";
import useOrigin from "@/hooks/use-origin";
import axios from "axios";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { useState } from "react";

// Modal
export default function InvitePeopleModal() {
  //
  // state
  const [hasCopied, setHasCopied] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // hooks
  const { openModal, isOpen, onClose, onOpen, data } = useModalStore();
  const origin = useOrigin();

  // invitation url
  const invitationUrl = `${origin}/invite/${data?.inviteCode}`;

  // handle close from Modal store
  function handleClose() {
    onClose();
  }

  // condition
  const hasOpened = isOpen && openModal === "inviteFriends";
  if (!hasOpened) return null;

  //  handles
  function handleCopyToClipboard() {
    setHasCopied(true);
    navigator.clipboard.writeText(invitationUrl);

    setTimeout(function () {
      setHasCopied(false);
    }, 1000);
  }

  async function handleGenerateInviteCode() {
    try {
      setIsUpdating(true);
      const server = await axios.patch(`/api/server/${data?.id}/invite-code`);
      onOpen("inviteFriends", server.data.server);
    } catch (err) {
      console.log(err);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <Dialog open={hasOpened} onOpenChange={() => handleClose()}>
      <DialogContent>
        <DialogHeader className="mb-2">
          <DialogTitle className="text-2xl text-center">
            Invite your friends
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              placeholder="Invitation code..."
              value={invitationUrl}
              readOnly
              disabled={hasCopied || isUpdating}
            />
            {hasCopied ? (
              <Check size={18} color="gray" />
            ) : (
              <Copy size={18} color="gray" onClick={handleCopyToClipboard} />
            )}
          </div>

          <button
            className="hover:underline hover:underline-offset-4 flex items-center gap-2 text-sm text-gray-600 disabled:no-underline disabled:text-gray-400"
            onClick={handleGenerateInviteCode}
            disabled={isUpdating}
          >
            <RefreshCcw size={17} />
            <span>New invitaiton code</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
