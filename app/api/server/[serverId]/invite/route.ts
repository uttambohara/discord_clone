import currentProfile from "@/data/users/current-profile";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { serverId: string } }
) {
  try {
    const currentUser = await currentProfile();
    if (!currentUser) return new NextResponse("Unauthorized!", { status: 401 });

    const updatedServer = await prisma.server.update({
      where: {
        id: params.serverId,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });

    return NextResponse.json({ status: "success", data: updatedServer });
  } catch (err) {
    console.log("invite-code", err);
    return new NextResponse("Internal error!", { status: 500 });
  }
}
