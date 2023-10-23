import { connectoToDB } from "@utils/database";
import Post from "@models/Post";
import { NextRequest, NextResponse } from "next/server";
import { STATUS } from "@utils/contants";

export const GET = async (request: NextRequest, { params }: { params: { slug: string } }) => {
  try {
    await connectoToDB();
    const post = await Post.
    find({status: {"$ne": STATUS.DELETED}}).
    findOne({
      slug: params.slug
    })
      .populate("medias")
      .populate("creator");
    if (post !== null) return NextResponse.json(JSON.stringify(post), { status: 200 });
    return NextResponse.json({ error: "Post not founded." }, { status: 404 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: "Server Error." }, { status: 500 });
  }
};

export const PUT = async (request: NextRequest, { params }: { params: { slug: string } }) => {
  const data = await request.json();
  try {
    await connectoToDB();

    let updatedPost = await Post.findOneAndUpdate({ slug: params.slug }, data, { new: true });

    return NextResponse.json({ object: JSON.stringify(updatedPost) }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 400 });
  }
};
