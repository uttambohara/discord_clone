import { CommandGroup, CommandItem } from "@/components/ui/command";
import { useRouter } from "next/navigation";
import React from "react";

interface ServerSearchCommand {
  data: {
    heading: string;
    type: "member" | "channel";
    serverId: string;
    subData?: {
      id: string;
      icon: React.ReactNode;
      label: string;
    }[];
  };
}

export default function ServerSearchCommand({ data }: ServerSearchCommand) {
  const router = useRouter();
  if (!!!data.subData?.length) return null;

  function handleCommandClick(id: string, type: "member" | "channel") {
    if (type === "member") {
      return router.push(`/server/${data.serverId}/conversation/${id}`);
    }

    return router.push(`/server/${data.serverId}/channel/${id}`);
  }

  return (
    <div>
      <CommandGroup heading={data.heading}>
        {data.subData?.map((item) => (
          <CommandItem
            key={item.id}
            onSelect={() => handleCommandClick(item.id, data.type)}
          >
            <span className="flex items-center gap-2">
              {item.icon}
              {item.label}
            </span>
          </CommandItem>
        ))}
      </CommandGroup>
    </div>
  );
}
