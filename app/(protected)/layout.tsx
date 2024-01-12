import { auth } from "@/auth";

import { Separator } from "@/components/ui/separator";
import currentProfile from "@/data/users/current-profile";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import NavigationAction from "@/components/navigation/navigation-action";
import NavigationItem from "@/components/navigation/navigation-item";
import NavigationProfile from "@/components/navigation/navigation-profile";

export default async function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log(await auth());
  const currentUser = await currentProfile();
  if (!currentUser) return redirect("/auth/login");

  console.log(currentUser.id);

  const associatedServers = await prisma.server.findMany({
    where: {
      members: {
        some: {
          profileId: currentUser.id,
        },
      },
    },
  });

  console.log(associatedServers);

  return (
    <div className="h-screen grid grid-cols-[65px_1fr]">
      <div className="border-r border-slate-200 py-4 flex items-center justify-between flex-col dark:bg-[#282b30] dark:border-white/10">
        <div className="space-y-4">
          <NavigationAction />
          <Separator />
          <NavigationItem associatedServers={associatedServers} />
        </div>

        <NavigationProfile />
      </div>
      <main className="dark:bg-[#424549]">{children}</main>
    </div>
  );
}
