import { prisma } from "@/lib/prisma";
import currentProfile from "@/lib/users/current-profile";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { serverId: string } }
) {
  try {
    const user = await currentProfile();
    if (!user) return new NextResponse("Unauthorized!", { status: 401 });
    //
    const { name, imageUrl } = await request.json();
    //
    const inviteCodeUpdatedServer = await prisma.server.update({
      where: {
        id: params.serverId,
        profileId: user.id,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json({
      status: "success",
      server: inviteCodeUpdatedServer,
    });
  } catch (err) {
    console.log("update_server", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
