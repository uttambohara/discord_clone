"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import AvatarEl from "../avatar";
import { ModeToggle } from "../mode-toggle";
import useCurrentUser from "@/hooks/use-current-user";

export default function NavFooter() {
  const session = useCurrentUser();
  return (
    <div className="flex flex-col gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <AvatarEl src={session?.image || ""} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => signOut()}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/*  */}
      <ModeToggle />
    </div>
  );
}
