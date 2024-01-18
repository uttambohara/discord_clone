import { MemberRole } from "@prisma/client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { memberRoleIconMap } from "./server-sidebar";

interface ServerMemberProps {
  imageUrl: string;
  name: string;
  role: MemberRole;
  memberId: string;
}

export default function ServerMember({
  imageUrl,
  name,
  role,
  memberId,
}: ServerMemberProps) {
  const router = useRouter();
  const params = useParams();

  function handleMemberClick() {
    router.push(`/server/${params.serverId}/conversations/${memberId}`);
  }
  return (
    <div>
      <div
        className="flex items-center gap-2 mb-2 hover:bg-slate-50 py-1 rounded-md px-2 dark:hover:bg-black/20 cursor-pointer"
        onClick={handleMemberClick}
      >
        <div className="relative h-8 w-8">
          <Image
            src={imageUrl}
            alt={name}
            fill
            priority
            className="rounded-full"
          />
        </div>
        {name} {memberRoleIconMap[role]}
      </div>
    </div>
  );
}
