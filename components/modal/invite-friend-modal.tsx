"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/useModal";
import useOrigin from "@/hooks/useOrigin";
import axios from "axios";
import { Copy, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Modal
export default function InviteFriendModal() {
  // Hook
  const { isOpen, openModal, onClose, data, onOpen } = useModal();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  const router = useRouter();
  const origin = useOrigin();

  // Invitation url
  const invitationUrl = `${origin}/invite/${data?.inviteCode}`;

  // Open and close state
  const isCurrentlyOpen = isOpen && openModal === "invitePeople";

  function handleClose() {
    onClose();
  }

  // Handler
  async function handleNewInvitationCode() {
    try {
      setIsUpdating(true);
      const server = await axios.patch(
        `/api/invite/${data?.inviteCode}/invite-code`,
      );
      router.refresh();
      onOpen("invitePeople", server.data.server);
    } catch (err) {
      console.log(err);
    } finally {
      setIsUpdating(false);
    }
  }

  function handleCopyToClipboard() {
    setIsCopying(true);
    navigator.clipboard.writeText(invitationUrl);
    setTimeout(() => setIsCopying(false), 2000);
  }

  return (
    <Dialog open={isCurrentlyOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-3 text-center text-2xl">
            Invite your friends
          </DialogTitle>
        </DialogHeader>
        {/* form */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <Input
              readOnly
              placeholder="Invitation code..."
              value={invitationUrl}
              disabled={isUpdating || isCopying}
            />
            <button
              className="rounded-md p-2 hover:bg-slate-50 disabled:text-slate-300"
              disabled={isCopying}
            >
              <Copy size={16} onClick={handleCopyToClipboard} />
            </button>
          </div>

          <button
            className="flex items-center justify-between gap-2 text-sm text-slate-600 hover:underline hover:underline-offset-4 disabled:text-slate-300 disabled:no-underline"
            onClick={handleNewInvitationCode}
            disabled={isUpdating}
          >
            <RefreshCcw size={16} />
            <span>New invitaiton code</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
