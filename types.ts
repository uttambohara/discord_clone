import { Server, Member, Profile, Channel } from "@prisma/client";
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketServer } from "socket.io";

export type ServerWithMembersProfile = Server & {
  members: (Member & { profile: Profile | null })[];
} & { channels: Channel[] };

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: Server & {
      io: SocketServer;
    };
  };
};
