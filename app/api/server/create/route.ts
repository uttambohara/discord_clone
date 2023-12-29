import initialProfile from "@/lib/initial-profile";
import { prisma } from "@/lib/prisma";
import { MemberType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// create server
export async function POST(request: NextRequest) {
  try {
    const currUser = await initialProfile();

    if (!currUser) return new NextResponse("Unauthorized", { status: 401 });

    const { name, imageUrl } = await request.json();

    const server = await prisma.server.create({
      data: {
        name,
        imageUrl,
        inviteCode: uuidv4(),
        profileId: currUser.id,
        channels: {
          create: {
            name: "general",
            profileId: currUser.id,
          },
        },
        members: {
          create: {
            role: MemberType.ADMIN,
            profileId: currUser.id,
          },
        },
      },
    });

    return NextResponse.json({ status: "success", server });
  } catch (err) {
    console.log("[create_server]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
