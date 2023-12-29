import initialProfile from "@/lib/initial-profile";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// create server
export async function PATCH(
  request: NextRequest,
  { params }: { params: { inviteCode: string } },
) {
  try {
    const currUser = await initialProfile();

    if (!currUser) return new NextResponse("Unauthorized", { status: 401 });

    const server = await prisma.server.update({
      where: {
        inviteCode: params.inviteCode,
        members: {
          some: {
            profileId: currUser.id,
          },
        },
      },
      data: {
        inviteCode: uuidv4(),
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
    console.log("[create_server]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
