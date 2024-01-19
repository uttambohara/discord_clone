"use client";

import { useSocket } from "./providers/socket-provider";
import { Badge } from "./ui/badge";

export default function SocketStatus() {
  const { isConnected } = useSocket();

  if (isConnected)
    return (
      <Badge className="bg-emerald-600 font-sans">Live! real time update</Badge>
    );

  return (
    <Badge className="bg-red-600 font-sans">
      Failed! Pooling every 2 sec...
    </Badge>
  );
}
