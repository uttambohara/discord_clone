import { Member, Server, Profile, Channel, Post } from "@prisma/client";
import { Socket, Server as NetServer } from "net";
import { NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";

export type ServerWithMembersWithChannels = Server & {
  members: (Member & { profile: Profile | null })[];
  channels: Channel[];
};

export type PostsWithMemberWithProfile = Post & {
  member: Member & { profile: Profile };
};

export type NextApiResponseSocketIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: ServerIO;
    };
  };
};
