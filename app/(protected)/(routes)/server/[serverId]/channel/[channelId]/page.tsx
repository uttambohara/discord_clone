import ChatContent from "@/components/chat/chat-content";
import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import { Separator } from "@/components/ui/separator";
import currentProfile from "@/data/current-profile";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Channel({
  params,
}: {
  params: { serverId: string; channelId: string };
}) {
  const currentUser = await currentProfile();
  if (!currentUser) return redirect("/auth/login");

  const { serverId, channelId } = params;

  const server = await prisma.server.findFirst({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: currentUser.id,
        },
      },
    },
    include: {
      members: {
        include: {
          profile: true,
        },
      },
    },
  });

  if (!server) redirect("/");

  const channel = await prisma.channel.findFirst({
    where: {
      id: channelId,
      serverId,
    },
  });

  if (!channel) redirect("/");

  const member = server.members.find(
    (member) => member.profileId === currentUser.id
  );

  if (!member) redirect("/");

  return (
    <div className="flex flex-col h-full">
      <ChatHeader name={channel.name} type={"channel"} />

      <ChatContent
        type={"channel"}
        name={channel.name}
        channelId={channel.id}
        paramKey={"channelId"}
        paramValue={channel.id}
        memberId={member.id}
        socketUrl={"/api/socket/messages"}
        socketParams={{
          channelId,
          serverId,
        }}
        profileId={currentUser.id}
      />

      <ChatInput
        type={"channel"}
        name={channel.name}
        apiUrl={"/api/socket/messages"}
        params={{ channelId, serverId, profileId: currentUser.id }}
      />
    </div>
  );
}
