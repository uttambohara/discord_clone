import currentProfile from "@/lib/current-profile";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { serverId: string } }
) {
  try {
    // authorization
    const currUser = await currentProfile();
    if (!currUser) return new NextResponse("Unauthorized", { status: 401 });

    // create server
    const server = await prisma.server.update({
      where: {
        id: params.serverId,
        profileId: currUser.profileId,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });

    return NextResponse.json({ status: "success", server });
  } catch (err) {
    console.log("create_server", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
