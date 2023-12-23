import initialProfile from "@/lib/initial-profile";
import { prisma } from "@/lib/prisma";
import { MemberRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    // Authentication
    const currUser = await initialProfile();
    if (!currUser) throw new NextResponse("Unauthorized", { status: 401 });

    // JSON parse
    const { imageUrl, name } = await request.json();

    // Server creation
    const server = await prisma.server.create({
      data: {
        imageUrl,
        name,
        profileId: currUser.id,
        inviteCode: uuidv4(),
        members: {
          create: {
            profileId: currUser.id,
            memberRole: MemberRole.ADMIN,
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

    return NextResponse.json({ staus: "success", server });
  } catch (err) {
    console.log("[CREATE_SERVER", err);
    throw new NextResponse("Internal error", { status: 500 });
  }
}
