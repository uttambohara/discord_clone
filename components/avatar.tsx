import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";

type AvatarEl = {
  src?: string;
};

export default function AvatarEl({ src }: AvatarEl) {
  return (
    <Avatar>
      <AvatarImage src={src} />
    </Avatar>
  );
}
