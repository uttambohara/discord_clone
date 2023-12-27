import currentProfile from "@/lib/current-profile";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { MemberType } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    // authorization
    const currUser = await currentProfile();

    if (!currUser) return new NextResponse("Unauthorized", { status: 401 });

    const values = await request.json();

    // create server
    const server = await prisma.server.create({
      data: {
        name: values.name,
        profileId: currUser.userId,
        imageUrl: values.imageUrl,
        inviteCode: uuidv4(),
        members: {
          create: {
            profileId: currUser.userId,
            role: MemberType.ADMIN,
          },
        },
        channels: {
          create: {
            name: "general",
          },
        },
      },
    });

    return NextResponse.json({ status: "success", server });
  } catch (err) {
    console.log("create_server", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
