import { Server } from "@prisma/client";
import ToolTip from "../tooltip";
import Link from "next/link";
import Image from "next/image";

interface NavItemsProps {
  serverUserIsTheMemberOf: Server[];
}

export default function NavItems({ serverUserIsTheMemberOf }: NavItemsProps) {
  return (
    <div className="flex flex-col gap-3">
      {serverUserIsTheMemberOf.map((server) => (
        <ToolTip label={server.name} key={server.id}>
          <Link href={`/server/${server.id}`}>
            <div className="h-12 w-12 rounded-full relative group">
              <Image
                src={server.imageUrl}
                alt={server.name}
                priority
                fill
                className="rounded-full object-fit group-hover:rounded-[12px]"
              />
            </div>
          </Link>
        </ToolTip>
      ))}
    </div>
  );
}
