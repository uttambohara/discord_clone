"use client";

import { useSocket } from "./providers/socket-provider";
import { Badge } from "./ui/badge";

export default function SocketIndicator() {
  const data = useSocket();
  return (
    <div>
      {data?.isConnected && (
        <Badge className="bg-emerald-600">
          Live socket connection established.
        </Badge>
      )}{" "}
      {!data?.isConnected && (
        <Badge className="bg-destructive">Failed! Pooling every 1s.</Badge>
      )}
    </div>
  );
}
