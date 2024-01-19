import { prisma } from "@/lib/prisma";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed!" });

  try {
    const { content, fileUrl } = req.body;
    const { profileId, channelId, serverId } = req.query;

    const currentProfile = await prisma.profile.findFirst({
      where: {
        id: profileId as string,
      },
    });

    if (!currentProfile)
      return res.status(401).json({ error: "Unauthorized!" });

    if (!channelId)
      return res.status(400).json({ error: "Channel Id missing!" });
    if (!serverId) return res.status(400).json({ error: "Server Id missing!" });

    if (!content) return res.status(400).json({ error: "Content missing!" });

    //
    const server = await prisma.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            profileId: profileId as string,
          },
        },
      },
      include: {
        members: true,
      },
    });

    if (!server) return res.status(404).json({ error: "Server not found!" });

    const channel = await prisma.channel.findFirst({
      where: {
        id: channelId as string,
        serverId: serverId as string,
      },
    });

    if (!channel) return res.status(404).json({ error: "Channel not found!" });

    const member = server.members.find(
      (member) => member.profileId === profileId
    );

    if (!member) return res.status(404).json({ error: "Member not found!" });

    const createdPost = await prisma.post.create({
      data: {
        content,
        fileUrl,
        channelId: channelId as string,
        memberId: member.id as string,
      },
    });
    const channelKey = `chat:${channelId}:message`;
    res?.socket?.server?.io?.emit(channelKey, createdPost);

    return res.status(200).json(createdPost);
  } catch (err) {
    console.log("socket_api", err);
  }
}
