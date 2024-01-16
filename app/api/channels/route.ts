import { prisma } from "@/lib/prisma";
import currentProfile from "@/lib/users/current-profile";
import { NextRequest, NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

export async function PATCH(request: NextRequest) {
  try {
    const user = await currentProfile();
    if (!user) return new NextResponse("Unauthorized!", { status: 401 });

    //
    const url = new URL(request.url).searchParams;
    const serverId = url.get("serverId");
    if (!serverId)
      return new NextResponse("ServerId doesn't exist!", { status: 400 });

    const { name, type } = await request.json();

    //
    const channelCreatedServer = await prisma.server.update({
      where: {
        id: serverId,
        profileId: user.id,
        members: {
          some: {
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            name,
            type,
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
        },
        channels: true,
      },
    });

    return NextResponse.json({
      status: "success",
      server: channelCreatedServer,
    });
  } catch (err) {
    console.log("create_channels", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
