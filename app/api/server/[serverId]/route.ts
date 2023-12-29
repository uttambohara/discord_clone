import initialProfile from "@/lib/initial-profile";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { serverId: string } },
) {
  try {
    const currUser = await initialProfile();

    if (!currUser) return new NextResponse("Unauthorized", { status: 401 });

    await prisma.server.delete({
      where: {
        id: params.serverId,
      },
    });

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.log("[delete_server]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
