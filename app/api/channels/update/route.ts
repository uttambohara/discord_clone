import currentProfile from "@/data/current-profile";
import { prisma } from "@/lib/prisma";
import { channelModalSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const currentUser = await currentProfile();
    if (!currentUser) return new NextResponse("Unauthorized!", { status: 401 });

    // Validating value
    const values = await request.json();
    const validatedValue = channelModalSchema.safeParse(values);
    if (!validatedValue.success)
      return new NextResponse("Invalid values!", { status: 400 });
    const { name, type } = values;
    //
    const { searchParams } = new URL(request.url);
    const serverId = searchParams.get("serverId");
    const channelId = searchParams.get("channelId");

    if (!serverId)
      return new NextResponse("Server Id doesn't exist!", { status: 400 });

    if (!channelId)
      return new NextResponse("Channel Id doesn't exist!", { status: 400 });

    const updatedServer = await prisma.server.update({
      where: {
        id: serverId,
        profileId: currentUser.id,
      },
      data: {
        channels: {
          update: {
            where: {
              id: channelId,
            },
            data: {
              channelType: type,
              name,
            },
          },
        },
      },
    });
    return NextResponse.json({ status: "success", updatedServer });
  } catch (err) {
    console.log("update_channel", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
