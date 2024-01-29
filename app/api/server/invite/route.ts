import currentProfile from "@/data/current-profile";
import { prisma } from "@/lib/prisma";
import { MemberRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function PATCH(request: NextRequest) {
  try {
    const currentUser = await currentProfile();
    if (!currentUser) return new NextResponse("Unauthorized!", { status: 401 });

    //  Queries
    const { searchParams } = new URL(request.url);
    const serverId = searchParams.get("serverId");
    if (!serverId)
      return new NextResponse("Server ID not found!", { status: 400 });

    //  Update server
    const updatedServer = await prisma.server.update({
      where: {
        id: serverId,
        profileId: currentUser.id,
        members: {
          some: {
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        token: uuidv4(),
      },
    });

    return NextResponse.json({ status: "success", updatedServer });
  } catch (err) {
    console.log("invite_people", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
