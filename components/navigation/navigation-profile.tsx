"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import AvatarEl from "@/components/avatar";
import { ModeToggle } from "@/components/mode-toggle";
import useCurrentUser from "@/data/auth/useCurrentUser";
import { signOut } from "next-auth/react";

export default function NavigationProfile() {
  const user = useCurrentUser();

  return (
    <div className="flex items-center flex-col gap-2">
      <ModeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <AvatarEl imageSrc={user?.image || ""} />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start">
          <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
