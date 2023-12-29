import { Separator } from "@/components/ui/separator";
import { Server } from "@prisma/client";
import MainSidebarList from "./navigation-item";
import MainSidebarAddServer from "./navigation-action";

interface MainSidebarProps {
  servers: Server[];
}

export default function MainSidebar({ servers }: MainSidebarProps) {
  return (
    <aside className="flex flex-col items-center space-y-4 border-r border-slate-200 px-4 py-2">
      <MainSidebarAddServer />
      <Separator />
      <MainSidebarList servers={servers} />
    </aside>
  );
}
