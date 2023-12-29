import currentProfile from "@/lib/current-profile";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { serverId: string; memberId: string } },
) {
  try {
    const currUser = await currentProfile();

    // Conditions
    if (!currUser) return new NextResponse("Unauthorized", { status: 401 });

    if (!params.serverId)
      return new NextResponse("ServerId doesn't exist....", { status: 400 });

    const server = await prisma.server.update({
      where: {
        id: params.serverId,
        profileId: {
          not: currUser.id,
        },
        members: {
          some: {
            profileId: currUser.id,
          },
        },
      },
      data: {
        members: {
          deleteMany: {
            profileId: currUser.id,
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
        },
      },
    });

    return NextResponse.json({ status: "success", server });
  } catch (err) {
    console.log("[member_leave]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
