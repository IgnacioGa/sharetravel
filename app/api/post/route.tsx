import { connectoToDB } from "@utils/database";
import Post from "@models/Post";
import { NextRequest, NextResponse } from "next/server";
import { STATUS } from "@utils/contants";

const searchOptions = ["status", "date"];

interface filterProps {
  [key: string]: string | undefined | {};
}

export const POST = async (request: NextRequest) => {
  // Only to delete principal image
  const data = await request.json();
  try {
    await connectoToDB();

    let updatedPost = await Post.findOneAndUpdate({ principalImage: data }, { $set: { principalImage: "" } }, { new: true });
    return NextResponse.json({ object: JSON.stringify(updatedPost) }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 400 });
  }
};

export const GET = async (request: NextRequest) => {
  const filter: filterProps = {};
  for (let option in searchOptions) {
    const searchOption = request.nextUrl.searchParams.get(searchOptions[option]);
    if (searchOption) {
      filter[searchOptions[option]] = searchOption;
    }
  }

  try {
    await connectoToDB();
    let listOfPosts = await Post.find({ status: { $ne: STATUS.DELETED } })
      .find(filter)
      .populate("creator");
    return NextResponse.json({ object: JSON.stringify(listOfPosts) }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 400 });
  }
};
