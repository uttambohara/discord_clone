"use client";

import { Server } from "@prisma/client";
import ToolTip from "../toolTip";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavListProps {
  serverUserIsThePartOf: Server[];
}

export default function NavList({ serverUserIsThePartOf }: NavListProps) {
  const { serverId } = useParams();

  return (
    <div className="flex flex-col gap-3 items-center">
      {serverUserIsThePartOf.map((server) => (
        <ToolTip label={server.name} key={server.id}>
          <Link href={`/server/${server.id}`}>
            <div key={server.id} className={"relative h-12 w-12"}>
              <Image
                src={server.imageUrl as string}
                alt={server.name}
                fill
                priority
                className={cn(
                  "object-cover rounded-full hover:rounded-[16px]",
                  server.id === serverId && "rounded-[16px]"
                )}
              />
            </div>
          </Link>
        </ToolTip>
      ))}
    </div>
  );
}
