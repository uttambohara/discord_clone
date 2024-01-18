import { prisma } from "@/lib/prisma";
import currentProfile from "@/lib/users/current-profile";
import { NextRequest, NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { channelId: string } }
) {
  try {
    const user = await currentProfile();
    if (!user) return new NextResponse("Unauthorized!", { status: 401 });
    const { channelId } = params;
    //
    const url = new URL(request.url).searchParams;
    const serverId = url.get("serverId");
    if (!serverId)
      return new NextResponse("Server Id doesn't exist!", { status: 400 });
    if (!channelId)
      return new NextResponse("Channel Id doesn't exist!", { status: 400 });

    //
    const { name, type } = await request.json();
    console.log(channelId);

    //
    const updatedChannel = await prisma.server.update({
      where: {
        id: serverId,
        channels: {
          some: {
            id: channelId,
          },
        },
      },
      data: {
        channels: {
          updateMany: {
            where: {
              id: channelId,
            },
            data: {
              name,
              type,
            },
          },
        },
      },
    });

    return NextResponse.json({
      status: "success",
      server: updatedChannel,
    });
  } catch (err) {
    console.log("update_channels", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { channelId: string } }
) {
  try {
    const user = await currentProfile();
    if (!user) return new NextResponse("Unauthorized!", { status: 401 });
    const { channelId } = params;
    //
    const url = new URL(request.url).searchParams;
    const serverId = url.get("serverId");
    if (!serverId)
      return new NextResponse("Server Id doesn't exist!", { status: 400 });
    if (!channelId)
      return new NextResponse("Channel Id doesn't exist!", { status: 400 });

    //
    const updatedChannel = await prisma.server.update({
      where: {
        id: serverId,
        channels: {
          some: {
            id: channelId,
            name: {
              not: "general",
            },
          },
        },
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
          delete: {
            id: channelId,
          },
        },
      },
    });

    return NextResponse.json({
      status: "success",
      server: updatedChannel,
    });
  } catch (err) {
    console.log("delete_channels", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
