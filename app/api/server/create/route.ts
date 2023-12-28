import currentProfile from "@/lib/current-profile";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { MemberType } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const currUser = await currentProfile();

    if (!currUser) return new NextResponse("Unauthorized", { status: 401 });

    const { imageUrl, name } = await request.json();

    // server creation
    const server = await prisma.server.create({
      data: {
        inviteCode: uuidv4(),
        imageUrl,
        name,
        members: {
          create: {
            profileId: currUser.id,
            role: MemberType.ADMIN,
          },
        },
        channels: {
          create: {
            name: "general",
            profileId: currUser.id,
          },
        },
      },
    });

    return NextResponse.json({ status: "success", server });
  } catch (err) {
    console.log("create_server", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
