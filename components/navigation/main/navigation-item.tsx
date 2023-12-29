import TooltipEl from "@/components/tooltipEl";
import { Server } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type MainSidebarListProps = {
  servers: Server[];
};

export default function MainSidebarList({ servers }: MainSidebarListProps) {
  return (
    <ul className="flex flex-col items-center gap-3">
      {servers.map((server) => (
        <TooltipEl key={server.id} content={server.name}>
          <Link href={`/server/${server.id}`}>
            <li className="group relative h-12 w-12">
              <Image
                src={server.imageUrl}
                alt={server.name}
                fill
                priority
                className="rounded-full object-cover transition hover:rounded-[24px] group-hover:rounded-[16px]"
              />
            </li>
          </Link>
        </TooltipEl>
      ))}
    </ul>
  );
}
