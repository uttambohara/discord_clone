"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useCurrentUser from "@/hooks/useCurrentUser";
import UserAvatar from "../user-avatar";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar src={user?.image || ""} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="right">
        <DropdownMenuItem onSelect={() => signOut()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
