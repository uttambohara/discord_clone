"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal";

import { MemberType } from "@prisma/client";
import axios from "axios";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { useState } from "react";

import { ScrollArea } from "../ui/scroll-area";
import { revalidatePath } from "next/cache";
import { ServerWithMemberWithProfile } from "@/type";
import AvatarEl from "../avatar";

const iconMap = {
  MODERATOR: <ShieldCheck size={18} />,
  ADMIN: <ShieldAlert size={18} color="darkRed" />,
  GUEST: <Shield size={18} />,
};

// Modal
export default function ManageMembersModal() {
  const [isUpdating, setIsUpdating] = useState("");
  const { isOpen, onOpen, openModal, onClose, data } = useModal();
  const server = data as ServerWithMemberWithProfile;
  const router = useRouter();

  if (!server || !server.members) return null;

  // Check if the modal is open
  const hasOpened = isOpen && openModal === "manageMembers";

  // Handlers

  //
  function handleClose() {
    onClose();
  }

  //
  async function handleRoleChange(member: string, role: MemberType) {
    const queryUrl = queryString.stringifyUrl({
      url: `/api/server/${server.id}/member/${member}`,
      query: {
        role,
      },
    });

    try {
      setIsUpdating(member);
      const serverData = await axios.patch(queryUrl);
      router.refresh();
      onOpen("manageMembers", serverData.data.server);
    } catch (err) {
      console.log(err);
    } finally {
      setIsUpdating("");
    }
  }

  async function handleKickUser(member: string) {
    const queryUrl = queryString.stringifyUrl({
      url: `/api/server/${server.id}/member/${member}`,
    });

    try {
      setIsUpdating(member);
      const serverData = await axios.delete(queryUrl);
      router.refresh();
      console.log(serverData.data.server);
      onOpen("manageMembers", serverData.data.server);
    } catch (err) {
      console.log(err);
    } finally {
      setIsUpdating("");
    }
  }

  return (
    <Dialog open={hasOpened} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader className="mb-4">
          <DialogTitle className="text-center text-2xl">
            Manage members
          </DialogTitle>
          <DialogDescription className="text-center">
            {server.members.length}{" "}
            {server.members.length > 0 ? "Members" : "Member"}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea>
          <div className="flex flex-col gap-4">
            {server.members.map((member) => (
              <div key={member.id} className="flex items-center gap-3">
                <AvatarEl src={member.profile?.imageUrl} />

                <div className="flex flex-col ">
                  <div className="flex items-center gap-1">
                    <span>{member.profile?.name}</span>
                    <span>{iconMap[member.role]}</span>
                  </div>
                  <p className="text-slate-500 text-xs">
                    {member.profile?.email}
                  </p>
                </div>

                {member.profileId !== server.profileId && (
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        {isUpdating === member.id ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <MoreVertical size={19} color="gray" />
                        )}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center gap-2 px-1 py-1">
                            <ShieldAlert size={16} />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              {/* Guest */}
                              <DropdownMenuItem
                                className="flex items-center gap-2 px-1 py-1"
                                onClick={() =>
                                  handleRoleChange(member.id, MemberType.GUEST)
                                }
                              >
                                <div className="flex items-center gap-1">
                                  {iconMap[MemberType.GUEST]}
                                  <span>Guest</span>
                                </div>
                                {member.role === MemberType.GUEST && <Check />}
                              </DropdownMenuItem>
                              {/* Moderator */}
                              <DropdownMenuItem
                                className="flex items-center gap-2 px-1 py-1"
                                onClick={() =>
                                  handleRoleChange(
                                    member.id,
                                    MemberType.MODERATOR,
                                  )
                                }
                              >
                                <div className="flex items-center gap-1">
                                  {iconMap[MemberType.MODERATOR]}
                                  <span>Moderator</span>
                                </div>
                                {member.role === MemberType.MODERATOR && (
                                  <Check />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>

                        <DropdownMenuItem
                          className="flex items-center gap-2 px-1 py-1"
                          onClick={() => handleKickUser(member.id)}
                        >
                          <Gavel size={16} />
                          <span>Kick</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
