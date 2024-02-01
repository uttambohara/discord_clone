import ServerChannel from "@/components/server/server-channel";
import ServerHead from "@/components/server/server-head";
import ServerMembers from "@/components/server/server-member";
import ServerSearch from "@/components/server/server-search";
import ServerSection from "@/components/server/server-section";
import initialProfile from "@/data/initial-user";
import { prisma } from "@/lib/prisma";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function ServerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) {
  const currentUser = await initialProfile();

  const serverUserIsThePartOf = await prisma.server.findFirst({
    where: {
      id: params.serverId,
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
      channels: true,
    },
  });

  if (!serverUserIsThePartOf) return redirect("/");

  const userRole = serverUserIsThePartOf?.members.find(
    (member) => member.profileId === currentUser.id
  )?.role;

  const textChannels = serverUserIsThePartOf?.channels?.filter(
    (channel) => channel.channelType === ChannelType.TEXT
  );
  const audioChannels = serverUserIsThePartOf?.channels?.filter(
    (channel) => channel.channelType === ChannelType.AUDIO
  );
  const videoChannels = serverUserIsThePartOf?.channels?.filter(
    (channel) => channel.channelType === ChannelType.VIDEO
  );
  const members = serverUserIsThePartOf?.members.filter(
    (member) => member.profileId !== currentUser.id
  );

  return (
    <div className="grid grid-cols-[270px_1fr] h-full">
      <div className="border-r border-slate-200 bg-zinc-200 dark:border-zinc-200/10 dark:bg-[#282b30]">
        <ServerHead
          serverUserIsThePartOf={serverUserIsThePartOf}
          profileId={currentUser.id}
        />

        <ServerSearch
          serverUserIsThePartOf={serverUserIsThePartOf}
          profileId={currentUser.id}
        />

        {/* Body */}
        <div>
          {textChannels.length > 0 && (
            <div className="p-2">
              <ServerSection
                heading={"Text channels"}
                type={"channel"}
                server={serverUserIsThePartOf}
                role={userRole}
              />
              {textChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  type={channel.channelType}
                  channel={channel}
                  role={userRole}
                />
              ))}
            </div>
          )}
        </div>

        <div>
          {audioChannels.length > 0 && (
            <div className="p-2">
              <ServerSection
                heading={"Audio channels"}
                type={"channel"}
                server={serverUserIsThePartOf}
                role={userRole}
              />
              {audioChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  type={channel.channelType}
                  channel={channel}
                  role={userRole}
                />
              ))}
            </div>
          )}
        </div>

        <div>
          {videoChannels.length > 0 && (
            <div className="p-2">
              <ServerSection
                heading={"Video channels"}
                type={"channel"}
                server={serverUserIsThePartOf}
                role={userRole}
              />
              {videoChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  type={channel.channelType}
                  channel={channel}
                  role={userRole}
                />
              ))}
            </div>
          )}
        </div>

        <div>
          {members.length > 0 && (
            <div className="p-2">
              <ServerSection
                role={userRole}
                heading={"Members"}
                type={"member"}
                server={serverUserIsThePartOf}
              />
              {members.map((member) => (
                <ServerMembers key={member.id} members={members} />
              ))}
            </div>
          )}
        </div>
      </div>
      <main className="dark:bg-[#36393e] h-screen">{children}</main>
    </div>
  );
}
