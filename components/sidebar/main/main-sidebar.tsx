import { ModeToggle } from "@/components/mode-toggle";
import { TooltipEl } from "@/components/tooltip";
import { Separator } from "@/components/ui/separator";
import currentProfile from "@/lib/current-profile";
import { prisma } from "@/lib/prisma";
import { UserButton, redirectToSignUp } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import AddButton from "./add-button";

export default async function MainSidebar() {
  const currUser = await currentProfile();

  if (!currUser) return redirectToSignUp();

  // display all the servers, the current user is subscribed
  const servers = await prisma.server.findMany({
    where: {
      members: {
        some: {
          profileId: currUser.userId,
        },
      },
    },
  });

  return (
    <div className="border-r border-gray-200 flex flex-col py-3 items-center gap-4 dark:border-slate-100/20">
      <TooltipEl content="Create a server">
        <AddButton />
      </TooltipEl>

      <Separator />

      <ul className="flex flex-col gap-3">
        {servers.map((server) => (
          <TooltipEl content={server.name} key={server.id}>
            <Link href={`/server/${server.id}`}>
              <li className="relative h-11 w-11 group cursor-pointer">
                <Image
                  src={server.imageUrl}
                  fill
                  priority
                  alt={server.name}
                  className="rounded-full group-hover:rounded-[12px] transition"
                />
              </li>
            </Link>
          </TooltipEl>
        ))}
      </ul>

      <div className="flex flex-col items-center gap-3 mt-auto">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-11 w-11",
            },
          }}
        />
      </div>
    </div>
  );
}
