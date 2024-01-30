"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";
import { MemberRole } from "@prisma/client";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { Check, Gavel, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { useState } from "react";
import { roleIconMap } from "@/lib/icon-map";

export default function ManageMembersModal() {
  const [isUpdating, setIsUpdating] = useState("");
  const { isOpen, onOpen, openModal, onClose, data } = useModal();
  const router = useRouter();

  // ...

  function handleClose() {
    onClose();
  }

  async function handleMemberKick(memberId: string) {
    try {
      setIsUpdating(memberId);
      const qs = queryString.stringifyUrl({
        url: "/api/members",
        query: {
          serverId: data.server?.id,
          memberId: memberId,
        },
      });
      const updatedData = await axios.delete(qs);
      router.refresh();
      onOpen("manageMembers", { server: updatedData.data.updatedServer });
    } catch (err) {
      console.log(err);
    } finally {
      setIsUpdating("");
    }
  }

  async function handleRoleChange(memberId: string, role: MemberRole) {
    try {
      setIsUpdating(memberId);
      const qs = queryString.stringifyUrl({
        url: "/api/members",
        query: {
          serverId: data.server?.id,
          memberId: memberId,
          role,
        },
      });
      const updatedData = await axios.patch(qs);
      router.refresh();
      onOpen("manageMembers", { server: updatedData.data.updatedServer });
    } catch (err) {
      console.log(err);
    } finally {
      setIsUpdating("");
    }
  }

  const hasOpened = isOpen && openModal === "manageMembers";
  return (
    <Dialog open={hasOpened} onOpenChange={handleClose}>
      <DialogContent className="dark:bg-[#282b30]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Manage members
          </DialogTitle>
          <DialogDescription>
            <span className="mb-3 text-center">
              Add and assume member roles for the participants.
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {data?.server?.members?.map((member) => (
            <div key={member.id} className="flex items-center gap-3">
              <div className="relative h-12 w-12">
                <Image
                  src={member.profile?.imageUrl as string}
                  alt={member.profile?.name as string}
                  fill
                  priority
                  className="rounded-full"
                />
              </div>
              <div>
                <h2 className="flex items-center gap-1">
                  {member.profile?.name}
                  {roleIconMap[member.role]}
                </h2>
                <p className="text-sm text-slate-400">
                  {member.profile?.email}
                </p>
              </div>
              {member.role !== MemberRole.ADMIN && (
                <div className="ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      {isUpdating === member.id ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <DotsVerticalIcon />
                      )}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-18"
                      align="start"
                      side="top"
                    >
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          className="flex items-center justify-between"
                          onSelect={() => handleMemberKick(member.id)}
                        >
                          <span>Kick</span>
                          <Gavel size={18} />
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>Role</DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                className="flex items-center justify-between gap-3"
                                onSelect={() =>
                                  handleRoleChange(
                                    member.id,
                                    MemberRole.MODERATOR
                                  )
                                }
                              >
                                <span className="flex items-center gap-1">
                                  {roleIconMap[MemberRole.MODERATOR]}
                                  Moderator
                                </span>

                                {member.role === MemberRole.MODERATOR && (
                                  <Check size={15} />
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="flex items-center justify-between gap-3"
                                onSelect={() =>
                                  handleRoleChange(member.id, MemberRole.GUEST)
                                }
                              >
                                <span className="flex items-center gap-1">
                                  {roleIconMap[MemberRole.GUEST]}
                                  Guest
                                </span>
                                {member.role === MemberRole.GUEST && (
                                  <Check size={15} />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
