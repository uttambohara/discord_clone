import { NextApiResponseSocketIO } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import { Server as NetServer } from "http";
import { Server as ServerIO } from "socket.io";

export const config = {
  api: {
    bodyParse: false,
  },
};

export default function handler(
  request: NextApiRequest,
  response: NextApiResponseSocketIO
) {
  if (!response.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = response.socket.server as any;
    const io = new ServerIO(httpServer, {
      path,
    });

    response.socket.server.io = io;
  }
  response.end();
}
