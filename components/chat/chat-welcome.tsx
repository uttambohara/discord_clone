import { Hash } from "lucide-react";
import React from "react";

interface ChatWelcomeProps {
  type: "channel" | "conversation";
  name: string;
}

export default function ChatWelcome({ type, name }: ChatWelcomeProps) {
  if (type === "channel") {
    return (
      <div className="border-b pb-4">
        <div className="p-2 bg-slate-500 text-white h-16 w-16 flex items-center justify-center rounded-full">
          <Hash size={32} />
        </div>
        <h2 className="text-3xl font-semibold">Welcome to #{name}</h2>
        <p>This is the start of the #{name} channel!</p>
      </div>
    );
  }
}
