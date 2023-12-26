"use client";
// Form
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";
import useOrigin from "@/hooks/use-origin";
import { CheckCheck, Copy, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function InvitationModal() {
  const router = useRouter();
  const [isCopying, setIsCopying] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { isOpen, currentModal, onOpen, onClose, data } = useModal();

  // Generate a new link
  const origin = useOrigin();
  const inviationLink = `${origin}/invite/${data?.inviteCode}`;

  // Handler
  async function onSubmit() {
    try {
      setIsUpdating(true);
      const newData = await axios.patch(`/api/server/${data?.id}/invite-code`);
      router.refresh();
      onOpen("inviteFriends", newData.data.newData);
    } catch (err) {
      console.log(err);
    } finally {
      setIsUpdating(false);
    }
  }

  const isModalOpen = isOpen && currentModal === "inviteFriends";

  //
  function handleCopyClipboard() {
    setIsCopying(true);
    navigator.clipboard.writeText(inviationLink);

    setTimeout(() => {
      setIsCopying(false);
    }, 2000);
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center mb-3 text-2xl">
            Invite Friends
          </DialogTitle>

          {/* Upload Form */}
          <div className="flex items-center gap-3">
            <Input value={inviationLink} readOnly disabled={isUpdating} />
            {isCopying ? (
              <CheckCheck size={17} color="gray" />
            ) : (
              <Copy size={17} color="gray" onClick={handleCopyClipboard} />
            )}
          </div>

          <DialogDescription>
            <button
              className="flex gap-2 items-center mt-1.5 hover:underline hover:underline-offset-4"
              onClick={onSubmit}
              disabled={isUpdating}
            >
              <RefreshCcw size={17} />
              <span> Generate a new link</span>
            </button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
