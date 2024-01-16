import NavFooter from "@/components/navigation/nav-footer";
import NavHead from "@/components/navigation/nav-head";
import NavItems from "@/components/navigation/nav-items";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";
import currentProfile from "@/lib/users/current-profile";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await currentProfile();
  if (!currentUser) return redirect("/");

  const serverUserIsTheMemberOf = await prisma.server.findMany({
    where: {
      members: {
        some: {
          profileId: currentUser.id,
        },
      },
    },
  });
  return (
    <div className="grid grid-cols-[70px_1fr] h-screen">
      <div className="border-r border-slate-100 py-3 flex items-center flex-col justify-between dark:bg-[#1e2124] dark:border-white/10">
        {/* Head */}
        <div className="flex flex-col gap-4">
          <NavHead />
          <Separator />
          {/* Servers */}
          <NavItems serverUserIsTheMemberOf={serverUserIsTheMemberOf} />
        </div>
        {/* Foot */}
        <NavFooter />
      </div>
      <main>{children}</main>
    </div>
  );
}
