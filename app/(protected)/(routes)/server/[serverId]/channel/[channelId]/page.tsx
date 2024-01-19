import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import { prisma } from "@/lib/prisma";
import currentProfile from "@/lib/users/current-profile";
import { redirect } from "next/navigation";

export default async function Channel({
  params,
}: {
  params: { serverId: string; channelId: string };
}) {
  const currentUser = await currentProfile();
  if (!currentUser) return redirect("/auth/login");

  const { serverId, channelId } = params;
  //
  const channel = await prisma.channel.findFirst({
    where: {
      id: params.channelId,
    },
  });

  return (
    <div className="h-full flex flex-col">
      <ChatHeader type={"channel"} label={channel?.name} />
      <div className="flex-1">Message Content</div>
      <ChatInput
        name={channel.name}
        type={"channel"}
        apiUrl={"/api/socket/message"}
        query={{
          channelId: channelId,
          serverId: serverId,
          profileId: currentUser.id,
        }}
      />
    </div>
  );
}
