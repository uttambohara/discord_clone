import initialProfile from "@/lib/initial-profile";
import { prisma } from "@/lib/prisma";
import { MemberType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// create server
export async function PATCH(
  request: NextRequest,
  { params }: { params: { serverId: string; memberId: string } },
) {
  try {
    const currUser = await initialProfile();
    const { searchParams } = new URL(request.url);

    const role = searchParams.get("role") as MemberType;

    // Conditions
    if (!currUser) return new NextResponse("Unauthorized", { status: 401 });

    if (!role)
      return new NextResponse("Role doesn't exist...", { status: 400 });

    if (!params.serverId)
      return new NextResponse("ServerId doesn't exist....", { status: 400 });

    const server = await prisma.server.update({
      where: {
        id: params.serverId,
      },
      data: {
        members: {
          updateMany: {
            where: {
              id: params.memberId,
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

    return NextResponse.json({ status: "success", server });
  } catch (err) {
    console.log("[member_update]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { serverId: string; memberId: string } },
) {
  try {
    const currUser = await initialProfile();

    // Conditions
    if (!currUser) return new NextResponse("Unauthorized", { status: 401 });

    if (!params.serverId)
      return new NextResponse("ServerId doesn't exist....", { status: 400 });

    const server = await prisma.server.update({
      where: {
        id: params.serverId,
      },
      data: {
        members: {
          delete: {
            id: params.memberId,
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
    console.log("[member_update_delete]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
