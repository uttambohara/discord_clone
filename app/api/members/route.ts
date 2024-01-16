import { prisma } from "@/lib/prisma";
import currentProfile from "@/lib/users/current-profile";
import { NextRequest, NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

export async function PATCH(request: NextRequest) {
  try {
    const user = await currentProfile();
    if (!user) return new NextResponse("Unauthorized!", { status: 401 });

    //
    const url = new URL(request.url).searchParams;
    const serverId = url.get("serverId");
    if (!serverId)
      return new NextResponse("ServerId doesn't exist!", { status: 400 });

    const memberId = url.get("memberId");
    if (!memberId)
      return new NextResponse("Member Id doesn't exist!", { status: 400 });

    const role = url.get("role") as MemberRole;
    if (!role)
      return new NextResponse("User role doesn't exist!", { status: 400 });

    console.log(serverId, memberId, role);

    const memberUpdatedServer = await prisma.server.update({
      where: {
        id: serverId,
      },
      data: {
        members: {
          updateMany: {
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

    return NextResponse.json({
      status: "success",
      server: memberUpdatedServer,
    });
  } catch (err) {
    console.log("update_member's_role", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
