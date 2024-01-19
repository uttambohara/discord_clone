import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";
import { Server as NetServer } from "http";
import { Server as SocketIo } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;

    const io = new SocketIo(httpServer, {
      path,
      addTrailingSlash: false,
    });
  }

  res.end();
}
