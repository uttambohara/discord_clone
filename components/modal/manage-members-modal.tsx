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
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import queryString from "query-string";

import { useModal } from "@/hooks/useModal";
import { ServerWithMemberWithProfile } from "@/type";
import { MemberType } from "@prisma/client";
import axios from "axios";
import {
  Check,
  Gavel,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { useRouter } from "next/navigation";
import AvatarEl from "../avatar";
import { ScrollArea } from "../ui/scroll-area";

const iconMap = {
  ADMIN: <ShieldAlert size={16} color="darkRed" />,
  MODERATOR: <ShieldCheck size={16} />,
  GUEST: null,
};

// Modal
export default function ManageMembersModal() {
  const { isOpen, openModal, onClose, data, onOpen } = useModal();
  const server = data as ServerWithMemberWithProfile;
  const router = useRouter();

  if (!server) return null;

  // Open and close state
  const isCurrentlyOpen = isOpen && openModal === "manageMembers";

  function handleClose() {
    onClose();
  }

  // Handle
  async function handleManageRoles(memberId: string, role: MemberType) {
    const query = queryString.stringifyUrl({
      url: `/api/server/${server?.id}/member/${memberId}`,
      query: {
        role,
      },
    });

    try {
      const server = await axios.patch(query);
      router.refresh();
      onOpen("manageMembers", server.data.server);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleKick(memberId: string) {
    const query = queryString.stringifyUrl({
      url: `/api/server/${server?.id}/member/${memberId}`,
    });

    try {
      const server = await axios.delete(query);
      router.refresh();
      onOpen("manageMembers", server.data.server);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Dialog open={isCurrentlyOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader className="mb-4">
          <DialogTitle className="text-center text-2xl">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center">
            {server.members.length}{" "}
            {server.members.length > 1 ? "Members" : "Member"}
          </DialogDescription>
        </DialogHeader>

        {/*  Display all the members */}
        {server.members.map((member) => (
          <ScrollArea key={member.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <AvatarEl src={member.profile?.imageUrl} />
                <div className="flex flex-col">
                  <h2 className="flex items-center gap-1">
                    <span> {member.profile?.name}</span>
                    <span>{iconMap[member.role]}</span>
                  </h2>
                  <p className="text-sm text-slate-500">
                    {member.profile?.email}
                  </p>
                </div>
              </div>

              {/* The creator should now have the option */}
              {member.profileId !== server.profileId && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <MoreVertical size={16} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="left" align="start">
                    <DropdownMenuGroup>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="flex items-center gap-2 px-2">
                          <ShieldQuestion size={18} />
                          <span>Role</span>

                          {/* Sub trigger */}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem
                              className="flex items-center justify-between gap-2 px-2"
                              onClick={() =>
                                handleManageRoles(member.id, MemberType.GUEST)
                              }
                            >
                              <span className="flex items-center gap-2">
                                <Shield size={18} />
                                <span>Guest</span>
                              </span>

                              {member.role === MemberType.GUEST && (
                                <Check size={14} />
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="flex items-center justify-between gap-2 px-2"
                              onClick={() =>
                                handleManageRoles(
                                  member.id,
                                  MemberType.MODERATOR,
                                )
                              }
                            >
                              <span className="flex items-center gap-2">
                                <ShieldCheck size={18} />
                                <span>Moderator</span>
                              </span>

                              {member.role === MemberType.MODERATOR && (
                                <Check size={14} />
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    </DropdownMenuGroup>
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        className="flex items-center gap-2 px-2"
                        onClick={() => handleKick(member.id)}
                      >
                        <Gavel size={18} />
                        <span>Kick</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </ScrollArea>
        ))}
      </DialogContent>
    </Dialog>
  );
}
