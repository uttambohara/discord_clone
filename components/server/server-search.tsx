import { CommandGroup, CommandItem } from "@/components/ui/command";
import { useParams, useRouter } from "next/navigation";
import React from "react";

interface ServerSearchProps {
  commandData: {
    name: string;
    type: "member" | "channel";
    data: {
      id: string;
      icon: React.ReactNode;
      label: string;
    }[];
  }[];
}

export default function ServerSearch({ commandData }: ServerSearchProps) {
  const { serverId } = useParams();
  const router = useRouter();

  function handleItemClick(type: "member" | "channel", id: string) {
    if (type === "channel") {
      router.push(`/server/${serverId}/channel/${id}`);
    } else {
      return router.push(`/server/${serverId}/conversations/${id}`);
    }
  }

  return (
    <div>
      {commandData.map((item) => {
        if (!item.data.length) return null;
        return (
          <CommandGroup heading={item.name} key={item.name}>
            {item.data.map((itemData) => (
              <CommandItem
                key={itemData.id}
                className="gap-2 cursor-pointer"
                onSelect={() => handleItemClick(item.type, itemData.id)}
              >
                {itemData.icon}
                <span>{itemData.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        );
      })}
    </div>
  );
}
