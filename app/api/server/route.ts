import currentProfile from "@/data/users/current-profile";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { MemberRole, ChannelType } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const currentUser = await currentProfile();
    if (!currentUser) return new NextResponse("Unauthorized!", { status: 401 });

    const { name, imageUrl } = await request.json();

    const createdServer = await prisma.server.create({
      data: {
        name,
        imageUrl,
        profileId: currentUser.id,
        inviteCode: uuidv4(),
        members: {
          create: {
            profileId: currentUser.id,
            role: MemberRole.ADMIN,
          },
        },
        channels: {
          create: {
            name: "general",
            type: ChannelType.TEXT,
          },
        },
      },
    });

    return NextResponse.json({ status: "success", data: createdServer });
  } catch (err) {
    console.log("create_server", err);
    return new NextResponse("Internal error!", { status: 500 });
  }
}
