import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function AvatarEl({ src }: { src: string | undefined }) {
  return (
    <Avatar>
      <AvatarImage src={src} />
    </Avatar>
  );
}
