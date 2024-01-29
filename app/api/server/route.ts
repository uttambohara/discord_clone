import currentProfile from "@/data/current-profile";
import { prisma } from "@/lib/prisma";
import { createServerSchema } from "@/schemas";
import { ChannelType, MemberRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const currentUser = await currentProfile();
    if (!currentUser) return new NextResponse("Unauthorized!", { status: 401 });

    // Validating value
    const values = await request.json();
    const validatedValue = createServerSchema.safeParse(values);
    if (!validatedValue.success)
      return new NextResponse("Invalid values!", { status: 400 });

    //  Create server
    const { imageUrl, name } = validatedValue.data;
    const createdServer = await prisma.server.create({
      data: {
        profileId: currentUser.id,
        imageUrl,
        name,
        token: uuidv4(),
        members: {
          create: {
            profileId: currentUser.id,
            role: MemberRole.ADMIN,
          },
        },
        channels: {
          create: {
            name: "general",
            channelType: ChannelType.TEXT,
          },
        },
      },
    });

    return NextResponse.json({ status: "success", createdServer });
  } catch (err) {
    console.log("create_server", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
