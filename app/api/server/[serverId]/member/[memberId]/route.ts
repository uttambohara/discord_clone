import currentProfile from "@/lib/current-profile";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { MemberType } from "@prisma/client";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { serverId: string; memberId: string } },
) {
  try {
    //
    const currUser = await currentProfile();
    const { searchParams } = new URL(request.url);

    // Validation
    if (!currUser) return new NextResponse("Unauthorized", { status: 401 });

    if (!params.memberId)
      return new NextResponse("Member id is missing...", { status: 400 });

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
    console.log("member_update", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { serverId: string; memberId: string } },
) {
  try {
    //
    const currUser = await currentProfile();
    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role") as MemberType;

    // Validation
    if (!currUser) return new NextResponse("Unauthorized", { status: 401 });

    if (!params.memberId)
      return new NextResponse("Member id is missing...", { status: 400 });

    if (!role) return new NextResponse("Role  is missing...", { status: 400 });

    //
    // const member = await prisma.member.update({
    //   where: {
    //     id: params.memberId,
    //   },
    //   data: {
    //     role,
    //   },
    // });

    const server = await prisma.server.update({
      where: {
        id: params.serverId,
      },
      data: {
        members: {
          update: {
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
    console.log("member_update", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
