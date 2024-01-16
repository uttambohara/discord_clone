import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarEl {
  src?: string;
}

export default function AvatarEl({ src }: AvatarEl) {
  return (
    <Avatar className="h-12 w-12">
      <AvatarImage src={src} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
