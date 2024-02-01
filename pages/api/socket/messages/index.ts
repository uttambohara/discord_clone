import { prisma } from "@/lib/prisma";
import { NextApiResponseSocketIO } from "@/types";
import { NextApiRequest } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponseSocketIO
) {
  try {
    const { serverId, channelId, profileId } = request.query;

    const currentUser = await prisma.profile.findFirst({
      where: {
        id: profileId as string,
      },
    });
    if (!currentUser)
      return response.status(401).json({ status: "Unauthorized!" });

    const { content, fileUrl } = request.body;

    const server = await prisma.server.findFirst({
      where: {
        id: serverId as string,
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

    if (!server)
      return response.status(400).json({ status: "Server not found!" });

    const channel = await prisma.channel.findFirst({
      where: {
        id: channelId as string,
        serverId: serverId as string,
      },
    });

    if (!channel)
      return response.status(400).json({ status: "Channel not found!" });

    const member = server.members.find(
      (member) => member.profileId === profileId
    );

    if (!member)
      return response.status(400).json({ status: "Memberl not found!" });

    //

    const post = await prisma.post.create({
      data: {
        channelId: channelId as string,
        content: content,
        fileUrl,
        memberId: member.id,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    const channelKey = `chat:${channel.id}:messages`;

    response.socket.server.io.emit(channelKey, post);

    return response.status(200).json({ status: post });
  } catch (err) {
    console.log(err);
    return response.status(500).json({ error: "Internal error!" });
  }
}
