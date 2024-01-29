import currentProfile from "@/data/current-profile";
import { prisma } from "@/lib/prisma";
import { MemberRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const currentUser = await currentProfile();
    if (!currentUser) return new NextResponse("Unauthorized!", { status: 401 });

    //
    const { searchParams } = new URL(request.url);
    const serverId = searchParams.get("serverId");
    const memberId = searchParams.get("memberId");
    const role = searchParams.get("role") as MemberRole;

    if (!serverId)
      return new NextResponse("Server Id doesn't exist!", { status: 400 });
    if (!memberId)
      return new NextResponse("Member Id doesn't exist!", { status: 400 });
    if (!role) return new NextResponse("Role doesn't exist!", { status: 400 });

    const updatedServer = await prisma.server.update({
      where: {
        id: serverId,
        profileId: currentUser.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: memberId,
            },
            data: {
              role,
            },
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
    return NextResponse.json({ status: "success", updatedServer });
  } catch (err) {
    console.log("update_member's_role", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const currentUser = await currentProfile();
    if (!currentUser) return new NextResponse("Unauthorized!", { status: 401 });

    //
    const { searchParams } = new URL(request.url);
    const serverId = searchParams.get("serverId");
    const memberId = searchParams.get("memberId");

    if (!serverId)
      return new NextResponse("Server Id doesn't exist!", { status: 400 });
    if (!memberId)
      return new NextResponse("Member Id doesn't exist!", { status: 400 });

    const updatedServer = await prisma.server.update({
      where: {
        id: serverId,
        profileId: currentUser.id,
      },
      data: {
        members: {
          delete: {
            id: memberId,
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
    return NextResponse.json({ status: "success", updatedServer });
  } catch (err) {
    console.log("delete_members", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
