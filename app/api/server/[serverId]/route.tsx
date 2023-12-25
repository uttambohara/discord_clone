import currentProfile from "@/lib/current-profile";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { serverId: string } }
) {
  try {
    //
    const currUser = await currentProfile();

    if (!currUser) return new NextResponse("Unauthorized", { status: 401 });

    const updatedServer = await prisma.server.update({
      where: {
        id: params.serverId,
        profileId: currUser.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });

    return NextResponse.json({ status: "success", newData: updatedServer });
  } catch (err) {
    console.log("[Server_update_invitationCode]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
