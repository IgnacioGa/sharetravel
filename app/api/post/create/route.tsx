import { connectoToDB } from "@utils/database";
import Post from "@models/Post";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const response = await request.formData();
  console.log(response, response.get("file"));

  try {
    await connectoToDB();
    const newPost = new Post({
      creator: response.get("user"),
      title: response.get("title"),
      text: response.get("text"),
      city: response.get("city"),
      status: response.get("status")
    });

    await newPost.save();
    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error: any) {
    const { errors } = error;
    console.log(errors);
    return NextResponse.json({ error: "Failed to create a new post" }, { status: 400 });
  }
};
