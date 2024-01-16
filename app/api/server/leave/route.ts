import { prisma } from "@/lib/prisma";
import currentProfile from "@/lib/users/current-profile";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const user = await currentProfile();
    if (!user) return new NextResponse("Unauthorized!", { status: 401 });

    //
    const url = new URL(request.url).searchParams;
    const serverId = url.get("serverId");
    if (!serverId)
      return new NextResponse("ServerId doesn't exist!", { status: 400 });

    //
    await prisma.server.update({
      where: {
        id: serverId,
        profileId: {
          not: user.id,
        },
        members: {
          some: {
            profileId: user.id,
          },
        },
      },
      data: {
        members: {
          deleteMany: {
            profileId: user.id,
          },
        },
      },
    });

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.log("create_server", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
