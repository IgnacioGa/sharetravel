import { connectoToDB } from "@utils/database";
import Post from "@models/Post";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: { slug: string } }) => {
  try {
    await connectoToDB();
    const post = await Post.findOne({
      slug: params.slug
    }).populate("creator");

    if (post !== null) return NextResponse.json(JSON.stringify(post), { status: 200 });
    return NextResponse.json({ error: "Post not founded." }, { status: 404 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: "Server Error." }, { status: 500 });
  }
};
