"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";
import { CreateServerModal, createServerModal } from "@/schemas";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AvatarEl from "../avatar";
import { MemberRole } from "@prisma/client";
import {
  Gavel,
  Loader,
  MoreVerticalIcon,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import queryString from "query-string";
import axios from "axios";

const roleIconMap = {
  [MemberRole.ADMIN]: <ShieldAlert size={18} className="text-red-600" />,
  [MemberRole.MODERATOR]: <ShieldCheck size={18} />,
  [MemberRole.GUEST]: <Shield size={18} />,
};

export default function ManageMembersModal() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingUser, setIsUpdatingUser] = useState("");

  const router = useRouter();
  const { onOpen, onClose, openModal, isOpen, server } = useModal();

  //   Form
  const form = useForm<CreateServerModal>({
    resolver: zodResolver(createServerModal),
    defaultValues: {
      imageUrl: "",
      name: "",
    },
  });

  async function handleUpdateRole(memberId: string, role: MemberRole) {
    try {
      setIsUpdatingUser(memberId);
      const query = queryString.stringifyUrl({
        url: "/api/members",
        query: {
          serverId: server?.id,
          memberId,
          role,
        },
      });

      const memberUpdatedServer = await axios.patch(query);

      onOpen("manageMember", memberUpdatedServer.data.server);
    } catch (err) {
      console.log(err);
    } finally {
      setIsUpdatingUser("");
    }
  }

  async function handleKickUser(memberId: string) {
    try {
      setIsUpdatingUser(memberId);
      const query = queryString.stringifyUrl({
        url: "/api/members/removeUser",
        query: {
          serverId: server?.id,
          memberId,
        },
      });

      const memberUpdatedServer = await axios.patch(query);

      onOpen("manageMember", memberUpdatedServer.data.server);
    } catch (err) {
      console.log(err);
    } finally {
      setIsUpdatingUser("");
    }
  }

  function handleClose() {
    form.reset();
    onClose();
  }
  const hasOpened = isOpen && openModal === "manageMember";

  console.log({ server });

  return (
    <Dialog open={hasOpened} onOpenChange={handleClose}>
      <DialogContent className="dark:bg-[#36393e] space-y-4">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Manage members
          </DialogTitle>
          <DialogDescription className="text-center">
            Manage and customize the role of the users.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {server?.members.map((member) => (
            <div key={member.id}>
              <div className="flex items-center gap-4">
                <AvatarEl src={member.profile?.imageUrl || ""} />
                <div className="w-full">
                  <div className="flex items-center gap-1">
                    {member.profile?.name}
                    <span>
                      {member.role !== MemberRole.GUEST &&
                        roleIconMap[member.role]}
                    </span>
                  </div>
                  <span className="text-sm text-slate-500 flex items-center justify-between">
                    {member.profile?.email}
                  </span>
                </div>
                <div>
                  {server.profileId !== member.profileId && (
                    <div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild className="cursor-pointer">
                          {updatingUser === member.id ? (
                            <Loader className="animate-spin" size={16} />
                          ) : (
                            <MoreVerticalIcon size={16} />
                          )}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-26">
                          <DropdownMenuGroup>
                            <DropdownMenuGroup>
                              <DropdownMenuSub>
                                <DropdownMenuSubTrigger className="flex items-center gap-2">
                                  <ShieldQuestion size={20} />
                                  Invite users
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                  <DropdownMenuSubContent>
                                    <DropdownMenuItem
                                      className="flex items-center gap-2"
                                      onSelect={() =>
                                        handleUpdateRole(
                                          member.id,
                                          MemberRole.GUEST
                                        )
                                      }
                                    >
                                      {roleIconMap[MemberRole.GUEST]}
                                      Guest
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="flex items-center gap-2"
                                      onSelect={() =>
                                        handleUpdateRole(
                                          member.id,
                                          MemberRole.MODERATOR
                                        )
                                      }
                                    >
                                      {roleIconMap[MemberRole.MODERATOR]}
                                      Moderator
                                    </DropdownMenuItem>
                                  </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                              </DropdownMenuSub>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="flex items-center gap-2"
                              onClick={() => handleKickUser(member.id)}
                            >
                              <Gavel size={20} />
                              Kick
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
