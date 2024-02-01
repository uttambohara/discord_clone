import { prisma } from "@/lib/prisma";
import { NextApiResponseSocketIO } from "@/types";
import { MemberRole, Post } from "@prisma/client";
import { NextApiRequest } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponseSocketIO
) {
  try {
    const { serverId, channelId, profileId, postId } = request.query;

    const currentUser = await prisma.profile.findFirst({
      where: {
        id: profileId as string,
      },
    });
    if (!currentUser)
      return response.status(401).json({ status: "Unauthorized!" });

    const { content } = request.body;

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
    const post = await prisma.post.findFirst({
      where: {
        id: postId as string,
      },
    });

    if (!post || post.deleted)
      return response.status(404).json({ error: "Post not found!" });

    const isAdmin = member.role === MemberRole.ADMIN;
    const isModerator = member.role === MemberRole.MODERATOR;
    const isGuest = member.role === MemberRole.GUEST;
    const isOwner = member.profileId === currentUser.id;

    const canMakeAnEdit = isOwner;
    const canDeleteAPost = isOwner && (isModerator || isAdmin);

    let updatedPost;

    if (request.method === "DELETE") {
      if (!canDeleteAPost)
        return response.status(401).json({ error: "Unauthorized!" });

      updatedPost = await prisma.post.update({
        where: {
          id: postId as string,
        },
        data: {
          fileUrl: null,
          content: "Deleted//",
          deleted: true,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
      });
    }

    if (request.method === "PATCH") {
      if (!canMakeAnEdit)
        return response.status(401).json({ error: "Unauthorized!" });

      updatedPost = await prisma.post.update({
        where: {
          id: postId as string,
        },
        data: {
          content,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
      });
    }

    const channelKey = `chat:${channel.id}:messages:update`;

    response.socket.server.io.emit(channelKey, updatedPost);

    return response.status(200).json({ status: "success" });
  } catch (err) {
    console.log(err);
    return response.status(500).json({ error: "Internal error!" });
  }
}
