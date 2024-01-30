import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { forwardRef } from "react";

interface UserAvatarProps {
  src: string;
  fallback?: string;
}

const UserAvatar = forwardRef(({ src }: UserAvatarProps, ref) => {
  return (
    <Avatar>
      <AvatarImage src={src} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
});

UserAvatar.displayName = "UserAvatar";

export default UserAvatar;
