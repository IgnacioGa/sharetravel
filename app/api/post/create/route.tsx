import { connectoToDB } from "@utils/database";
import Post from "@models/Post";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const data = await request.json();
  try {
    await connectoToDB();

    const newPost = new Post({ ...data });
    const post = await newPost.save();
    return NextResponse.json({ object: JSON.stringify(post) }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to create a new post" }, { status: 400 });
  }
};
