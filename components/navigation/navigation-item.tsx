"use client";

import ToolTip from "@/components/tooltip";
import Image from "next/image";
import Link from "next/link";
import { Server } from "@prisma/client";
import { useParams, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface MainSidebarBodyProps {
  associatedServers: Server[];
}

export default function NavigationItem({
  associatedServers,
}: MainSidebarBodyProps) {
  const { serverId } = useParams();

  return (
    <div className="flex flex-col gap-4">
      {associatedServers.map((server) => (
        <ToolTip label={server.name} key={server.id} side="right" align="start">
          <Link href={`/server/${server.id}`}>
            <div className="relative h-12 w-12 group">
              <Image
                src={server.imageUrl as string}
                alt={server.name}
                fill
                priority
                className={cn(
                  "rounded-full group-hover:rounded-[18px] object-cover",
                  serverId === server.id && "rounded-[18px]"
                )}
              />
            </div>
          </Link>
        </ToolTip>
      ))}
    </div>
  );
}
