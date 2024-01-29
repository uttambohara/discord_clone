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

export default function InvitePeopleModal() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const { isOpen, onOpen, openModal, onClose, data } = useModal();
  const router = useRouter();

  // ...
  const origin = typeof window !== undefined ? window.location.origin : "";
  const invitationLink = `${origin}/invite-code/${data?.server?.token}`;

  async function handleGenerateNewLink() {
    try {
      setIsUpdating(true);
      const url = queryString.stringifyUrl({
        url: "/api/server/invite",
        query: {
          serverId: data.server?.id,
        },
      });
      const updatedServer = await axios.patch(url);
      router.refresh();
      onOpen("invitePeople", { server: updatedServer.data.updatedServer });
    } catch (err) {
      console.log(err);
    } finally {
      setIsUpdating(false);
    }
  }
  function handleClose() {
    onClose();
  }

  function handleCopy() {
    setIsCopying(true);
    navigator.clipboard.writeText(invitationLink);
    setTimeout(() => {
      setIsCopying(false);
    }, 2000);
  }

  const hasOpened = isOpen && openModal === "invitePeople";
  return (
    <Dialog open={hasOpened} onOpenChange={handleClose}>
      <DialogContent className="dark:bg-[#282b30]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Invite friends
          </DialogTitle>
          <DialogDescription>
            <span className="mb-3 text-center">
              Share this link with your friends to invite them to your server.
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Input
              value={invitationLink}
              readOnly
              disabled={isCopying || isUpdating}
            />
            {!isCopying ? (
              <div
                className="border p-1 rounded-sm cursor-pointer"
                onClick={handleCopy}
              >
                <Copy size={16} />
              </div>
            ) : (
              <div className="p-1 rounded-sm" onClick={handleCopy}>
                <Check size={16} />
              </div>
            )}
          </div>

          <Button
            className="flex items-center gap-1 text-sm text-zinc-500"
            variant={"link"}
            disabled={isUpdating}
            onClick={handleGenerateNewLink}
          >
            <RefreshCcw size={16} />
            Generate a new link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
