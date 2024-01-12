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
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useModal } from "@/hooks/useModal";
import { MemberRole } from "@prisma/client";
import {
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AvatarEl from "../avatar";
import queryString from "query-string";
import axios from "axios";

const roleIconMap = {
  [MemberRole.ADMIN]: <ShieldAlert size={18} className="text-red-600" />,
  [MemberRole.MODERATOR]: <ShieldCheck size={18} className="text-blue-600" />,
  [MemberRole.GUEST]: <Shield size={18} />,
};

export default function ManageMembersModal() {
  const [isUpdating, setIsUpdating] = useState("");
  const [isDeleting, setIsDeleting] = useState("");
  const router = useRouter();
  const { isOpen, onOpen, openModal, onClose, data } = useModal();

  // update role
  async function handleUpdateUserRole(memberId: string, role: MemberRole) {
    try {
      setIsUpdating(memberId);
      const url = queryString.stringifyUrl({
        url: "/api/members",
        query: {
          serverId: data?.id,
          role,
          memberId,
        },
      });

      const memberRoleUpdatedServer = await axios.patch(url);
      router.refresh();
      onOpen("manageMembers", memberRoleUpdatedServer.data.server);
    } catch (err) {
      console.log(err);
    } finally {
      setIsUpdating("");
    }
  }

  async function handleKick(memberId: string) {
    try {
      setIsDeleting(memberId);
      const url = queryString.stringifyUrl({
        url: "/api/members",
        query: {
          serverId: data?.id,
          memberId,
        },
      });

      const memberRoleUpdatedServer = await axios.delete(url);
      router.refresh();
      onOpen("manageMembers", memberRoleUpdatedServer.data.server);
    } catch (err) {
      console.log(err);
    } finally {
      setIsDeleting("");
    }
  }

  const hasOpened = isOpen && openModal === "manageMembers";

  console.log({ isDeleting });
  console.log({ isUpdating });
  if (!hasOpened) return null;
  return (
    <Dialog open={hasOpened} onOpenChange={onClose}>
      <DialogContent className="dark:bg-[#36393e]">
        <DialogHeader className="mb-5">
          <DialogTitle className="text-center text-2xl">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center">
            {data?.members.length} {data?.members.length ? "members" : "member"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {data?.members.map((member) => (
            <div key={member.id}>
              <div className="flex items-center gap-4 w-full justify-between">
                <div className="flex gap-3">
                  <AvatarEl imageSrc={member.profile?.imageUrl!} />

                  <div>
                    <h2 className="flex items-center gap-1">
                      <span>{member.profile?.name}</span>
                      {roleIconMap[member.role]}
                    </h2>
                    <div className="text-muted-foreground text-sm">
                      {member.profile?.email}
                    </div>
                  </div>
                </div>

                {/*   */}
                {data.profileId !== member.profileId && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      {isDeleting === member.id || isUpdating === member.id ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <MoreVertical size={18} className="cursor-pointer" />
                      )}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-16">
                      <DropdownMenuGroup>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center gap-1">
                            <ShieldQuestion size={18} />
                            <span> Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                className="flex items-center gap-2"
                                onSelect={() =>
                                  handleUpdateUserRole(
                                    member.id,
                                    MemberRole.GUEST
                                  )
                                }
                              >
                                {roleIconMap[MemberRole.GUEST]}
                                <span>Guest</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="flex items-center gap-2"
                                onSelect={() =>
                                  handleUpdateUserRole(
                                    member.id,
                                    MemberRole.MODERATOR
                                  )
                                }
                              >
                                {roleIconMap[MemberRole.MODERATOR]}
                                <span>Moderator</span>
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="flex items-center gap-1"
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
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
