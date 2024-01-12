import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Server({
  params,
}: {
  params: { serverId: string };
}) {
  const serverId = params.serverId;

  const serverInTheSystem = await prisma.server.findFirst({
    where: {
      id: serverId,
    },
  });

  if (!serverInTheSystem) return redirect("/");

  return <div>Content</div>;
}
