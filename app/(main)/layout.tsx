import MainSidebar from "@/components/navigation/main/navigation-sidebar";
import currentProfile from "@/lib/current-profile";
import { prisma } from "@/lib/prisma";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currUser = await currentProfile();

  // If unknown users accesses it, they will be redirected by the middleware
  //
  const servers = await prisma.server.findMany({
    where: {
      members: {
        some: {
          profileId: currUser.id,
        },
      },
    },
  });

  return (
    <section className="grid h-screen grid-cols-[70px_1fr]">
      <MainSidebar servers={servers} />

      <main>{children}</main>
    </section>
  );
}
