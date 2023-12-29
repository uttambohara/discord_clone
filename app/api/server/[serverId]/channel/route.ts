import initialProfile from "@/lib/initial-profile";
import { prisma } from "@/lib/prisma";
import { MemberType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// create server
export async function POST(
  request: NextRequest,
  { params }: { params: { serverId: string } },
) {
  try {
    const currUser = await initialProfile();

    // Conditions
    if (!currUser) return new NextResponse("Unauthorized", { status: 401 });

    const { name, type } = await request.json();

    if (!params.serverId)
      return new NextResponse("ServerId doesn't exist..", { status: 400 });

    if (name === "general")
      return new NextResponse("Channel name cannot be general.", {
        status: 400,
      });

    const server = await prisma.server.update({
      where: {
        id: params.serverId,
        members: {
          some: {
            role: {
              in: [MemberType.ADMIN, MemberType.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            name,
            type,
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
    console.log("[create_channel]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
