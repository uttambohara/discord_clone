"use client";

import { roleIconMap } from "@/lib/icon-map";
import { Member, Profile } from "@prisma/client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

interface ServerMembersProps {
  members: (Member & { profile: Profile | null })[];
}

export default function ServerMembers({ members }: ServerMembersProps) {
  const router = useRouter();

  const { serverId } = useParams();

  function handleClick(id: string) {
    router.push(`/server/${serverId}/conversation/${id}`);
  }
  return (
    <div className="mt-3">
      {members.map((member) => (
        <div
          key={member.id}
          className="flex items-center gap-2 hover:bg-zinc-300 hover:dark:bg-zinc-800/80 rounded-md cursor-pointer"
          onClick={() => handleClick(member.id)}
        >
          <div className="relative h-11 w-11">
            <Image
              src={member.profile?.imageUrl!}
              fill
              priority
              className="rounded-full alt"
              alt={member.profile?.name!}
            />
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span>{member.profile?.name}</span>
            {roleIconMap[member.role]}
          </div>
        </div>
      ))}
    </div>
  );
}
