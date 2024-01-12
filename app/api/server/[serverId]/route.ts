import currentProfile from "@/data/users/current-profile";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { serverId: string } }
) {
  try {
    const currentUser = await currentProfile();
    if (!currentUser) return new NextResponse("Unauthorized!", { status: 401 });

    const values = await request.json();

    const updatedServer = await prisma.server.update({
      where: {
        id: params.serverId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json({ status: "success", data: updatedServer });
  } catch (err) {
    console.log("update-server", err);
    return new NextResponse("Internal error!", { status: 500 });
  }
}
