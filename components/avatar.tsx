import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarElProps {
  imageSrc: string;
}

export default function AvatarEl({ imageSrc }: AvatarElProps) {
  return (
    <Avatar className="w-12 h-12">
      <AvatarImage src={imageSrc} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
