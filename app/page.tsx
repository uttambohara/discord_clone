import { ModeToggle } from "@/components/mode-toggle";
import CurrentProfle from "@/lib/current-profile";
import { UserButton } from "@clerk/nextjs";

export default async function Home() {
  //
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <ModeToggle />
    </div>
  );
}
