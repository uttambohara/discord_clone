"use client";

import { cn } from "@/lib/utils";
import { Server } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

type SidebarListProps = {
  servers: Server[];
};

export default function SidebarList({ servers }: SidebarListProps) {
  const params = useParams();

  return (
    <div className="flex flex-col gap-4">
      {servers.map((server) => (
        <Link href={`/server/${server.id}`} key={server.id}>
          <button className="h-12 w-12 group relative flex items-center">
            {/* Side blob */}
            {server.id === params.serverId && (
              <div className="absolute -left-3 h-[2rem] w-[5px] bg-black rounded-r-full group-hover:h-full transition-all ease dark:bg-white"></div>
            )}
            {server.id !== params.serverId && (
              <div className="absolute -left-3 h-[9px] w-[5px] bg-black rounded-r-full group-hover:h-full transition-all ease dark:bg-white"></div>
            )}

            <Image
              src={server.imageUrl}
              alt={server.name}
              fill
              className={`${cn(
                "rounded-full hover:rounded-[16px] transition-all ease",
                server.id === params.serverId && "rounded-[16px]"
              )}`}
            />
          </button>
        </Link>
      ))}
    </div>
  );
}
