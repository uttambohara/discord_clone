import currentProfile from "@/lib/current-profile";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { serverId: string } }
) {
  try {
    //
    const currUser = await currentProfile();

    if (!currUser) return new NextResponse("Unauthorized", { status: 401 });

    const values = await request.json();

    const updatedServer = await prisma.server.update({
      where: {
        id: params.serverId,
        profileId: currUser.id,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json({ status: "success", newData: updatedServer });
  } catch (err) {
    console.log("[customize_server]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
