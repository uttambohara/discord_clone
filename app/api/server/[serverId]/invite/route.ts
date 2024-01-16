import { prisma } from "@/lib/prisma";
import currentProfile from "@/lib/users/current-profile";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { serverId: string } }
) {
  try {
    const user = await currentProfile();
    if (!user) return new NextResponse("Unauthorized!", { status: 401 });
    //
    //
    const inviteCodeUpdatedServer = await prisma.server.update({
      where: {
        id: params.serverId,
        profileId: user.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });

    return NextResponse.json({
      status: "success",
      server: inviteCodeUpdatedServer,
    });
  } catch (err) {
    console.log("update_invite_code", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
