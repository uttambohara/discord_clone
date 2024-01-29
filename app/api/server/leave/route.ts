import currentProfile from "@/data/current-profile";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const currentUser = await currentProfile();
    if (!currentUser) return new NextResponse("Unauthorized!", { status: 401 });

    //
    const { searchParams } = new URL(request.url);
    const serverId = searchParams.get("serverId");

    if (!serverId)
      return new NextResponse("Server Id doesn't exist!", { status: 400 });

    await prisma.server.update({
      where: {
        id: serverId,
      },
      data: {
        members: {
          deleteMany: {
            profileId: currentUser.id,
          },
        },
      },
    });

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.log("leave_channel", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
