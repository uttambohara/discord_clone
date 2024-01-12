import currentProfile from "@/data/users/current-profile";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

export async function DELETE(request: NextRequest) {
  try {
    const currentUser = await currentProfile();
    if (!currentUser) return new NextResponse("Unauthorized!", { status: 401 });

    //
    const { searchParams } = new URL(request.url);
    const serverId = searchParams.get("serverId");
    if (!serverId)
      return new NextResponse("Server doesn't exist!!", { status: 400 });

    const memberId = searchParams.get("memberId");
    if (!memberId)
      return new NextResponse("Member id doesn't exist!!", { status: 400 });

    //
    const updatedServer = await prisma.server.update({
      where: {
        id: serverId!,
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
      },
    });

    return NextResponse.json({ status: "success", server: updatedServer });
  } catch (err) {
    console.log("update-server", err);
    return new NextResponse("Internal error!", { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const currentUser = await currentProfile();
    if (!currentUser) return new NextResponse("Unauthorized!", { status: 401 });

    //
    const { searchParams } = new URL(request.url);
    const serverId = searchParams.get("serverId");
    if (!serverId)
      return new NextResponse("Server doesn't exist!!", { status: 400 });

    const memberId = searchParams.get("memberId");
    if (!memberId)
      return new NextResponse("Member id doesn't exist!!", { status: 400 });

    const role = searchParams.get("role") as MemberRole;
    if (!role) return new NextResponse("Role doesn't exist!!", { status: 400 });

    //
    const updatedServer = await prisma.server.update({
      where: {
        id: serverId!,
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
      },
    });

    return NextResponse.json({ status: "success", server: updatedServer });
  } catch (err) {
    console.log("update-server", err);
    return new NextResponse("Internal error!", { status: 500 });
  }
}
