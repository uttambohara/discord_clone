import { prisma } from "@/lib/prisma";
import { Post } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const POST_LIMIT = 10;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const channelId = searchParams.get("channelId");
    const cursor = searchParams.get("cursor");

    let posts: Post[];

    if (!!cursor) {
      posts = await prisma.post.findMany({
        take: POST_LIMIT,
        skip: 1,
        where: {
          channelId,
        },
        cursor: {
          id: cursor,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    } else {
      posts = await prisma.post.findMany({
        take: POST_LIMIT,
        where: {
          channelId,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    }

    let nextCursor = null;
    if (POST_LIMIT === posts.length) {
      nextCursor = posts[posts.length - 1].id;
    }

    return NextResponse.json({
      nextCursor,
      posts,
    });

    //
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Error!", { status: 500 });
  }
}
