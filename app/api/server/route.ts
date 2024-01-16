import { prisma } from "@/lib/prisma";
import currentProfile from "@/lib/users/current-profile";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { MemberRole, ChannelType } from "@prisma/client";

export async function DELETE(request: NextRequest) {
  try {
    const user = await currentProfile();
    if (!user) return new NextResponse("Unauthorized!", { status: 401 });

    //
    const url = new URL(request.url).searchParams;
    const serverId = url.get("serverId");
    if (!serverId)
      return new NextResponse("ServerId doesn't exist!", { status: 400 });

    //
    await prisma.server.delete({
      where: {
        id: serverId,
      },
    });

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.log("create_server", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await currentProfile();
    if (!user) return new NextResponse("Unauthorized!", { status: 401 });

    //
    const { imageUrl, name } = await request.json();

    const createdServer = await prisma.server.create({
      data: {
        name,
        profileId: user.id,
        imageUrl,
        inviteCode: uuidv4(),
        members: {
          create: {
            profileId: user.id,
            role: MemberRole.ADMIN,
          },
        },
        channels: {
          create: {
            profileId: user.id,
            name: "general",
            type: ChannelType.TEXT,
          },
        },
      },
    });

    return NextResponse.json({ status: "success", server: createdServer });
  } catch (err) {
    console.log("create_server", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
