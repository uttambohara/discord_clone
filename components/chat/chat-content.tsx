"use client";

import { useGetPosts } from "@/hooks/use-get-posts";
import ChatWelcome from "./chat-welcome";
import ChatItem from "./chat-item";
import { profile } from "console";
import { Loader, ServerCrash } from "lucide-react";

interface ChatContentProps {
  type: "channel" | "conversation";
  name: string;
  channelId: string;
  paramKey: string;
  paramValue: string;
  memberId: string;
  socketUrl: string;
  socketParams: Record<string, string>;
  profileId: string;
}

export default function ChatContent({
  type,
  name,
  channelId,
  paramKey,
  paramValue,
  memberId,
  socketUrl,
  socketParams,
  profileId,
}: ChatContentProps) {
  const queryKey = `chat:${channelId}`;
  const addKey = `chat:${channelId}:messages`;
  const updateKey = `chat:${channelId}:messages:update`;

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useGetPosts({ queryKey, paramKey, paramValue });

  if (status === "pending") {
    return (
      <div className="grid place-content-center h-full">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="grid place-content-center h-full">
        <ServerCrash />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full px-4 overflow-y-scroll">
      <div className="flex-1">&nbsp;</div>

      <div className="py-3">
        <ChatWelcome type={"channel"} name={name} />

        <div className="space-y-2 mt-5">
          {data?.pages
            .flatMap((item) => item.posts)
            .map((post, index) => (
              <ChatItem
                key={index}
                post={post}
                memberId={memberId}
                socketUrl={socketUrl}
                socketParams={socketParams}
                profileId={profileId}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
