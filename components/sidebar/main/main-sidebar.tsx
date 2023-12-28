import CreateServer from "@/components/create-server";
import { ModeToggle } from "@/components/mode-toggle";
import TooltipEl from "@/components/tooltip";
import currentProfile from "@/lib/current-profile";
import { prisma } from "@/lib/prisma";
import { UserButton, redirectToSignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default async function MainSidebar() {
  const currUser = await currentProfile();

  if (!currUser) return redirectToSignIn();

  const servers = await prisma.server.findMany({
    where: {
      members: {
        some: {
          profileId: currUser.id,
        },
      },
    },
  });
  return (
    <div className="border-r border-slate-200 my-4 flex flex-col items-center gap-4 dark:border-slate-200/10">
      <TooltipEl content={"Add a server"}>
        <CreateServer />
      </TooltipEl>

      <ul className="flex item-center gap-2 flex-col">
        {servers.map((server) => (
          <TooltipEl key={server.id} content={server.name}>
            <Link href={`/server/${server.id}`}>
              <li className="relative h-12 w-12 group">
                <Image
                  src={server.imageUrl}
                  alt={server.name}
                  fill
                  priority
                  className="rounded-full group-hover:rounded-[20px] cursor-pointer"
                />
              </li>
            </Link>
          </TooltipEl>
        ))}
      </ul>

      <div className="mt-auto flex flex-col items-center gap-3">
        <ModeToggle />
        <UserButton
          appearance={{ elements: { avatarBox: "h-12 w-12" } }}
          afterSignOutUrl="/"
        />
      </div>
    </div>
  );
}
