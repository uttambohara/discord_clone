import currentProfile from "@/data/current-profile";
import { prisma } from "@/lib/prisma";
import { createServerSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { serverId: string } }
) {
  try {
    const currentUser = await currentProfile();
    if (!currentUser) return new NextResponse("Unauthorized!", { status: 401 });

    // Validating value
    const values = await request.json();
    const validatedValue = createServerSchema.safeParse(values);
    if (!validatedValue.success)
      return new NextResponse("Invalid field!", { status: 400 });

    //
    const { serverId } = params;
    if (!serverId)
      return new NextResponse("Server id is missing!", { status: 400 });

    //  Update server
    const { imageUrl, name } = validatedValue.data;
    const updatedServer = await prisma.server.update({
      where: {
        id: serverId,
        profileId: currentUser.id,
      },
      data: {
        imageUrl,
        name,
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
    console.log("update_server", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
