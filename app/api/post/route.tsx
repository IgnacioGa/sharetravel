import { connectoToDB } from "@utils/database";
import Post from "@models/Post";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    // Only to delete principal image
  const data = await request.json();
  try {
    await connectoToDB();

    let updatedPost = await Post.findOneAndUpdate({ principalImage: data }, { $set: {principalImage: ''} }, { new: true });
    return NextResponse.json({ object: JSON.stringify(updatedPost) }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 400 });
  }
};

export const GET = async() => {
  try {
    await connectoToDB();

    let listOfPosts = await Post.find().populate("creator");
    return NextResponse.json({ object: JSON.stringify(listOfPosts) }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 400 });
  }
}