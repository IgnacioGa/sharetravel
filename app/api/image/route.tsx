import Media from "@models/Media";
import { connectoToDB } from "@utils/database";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest) => {
    const data = await request.json();
    try {
      await connectoToDB();
  
      await Media.findOneAndDelete({ url: data });
      return NextResponse.json({ message: 'Delete Correctly' }, { status: 201 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "Failed to update post" }, { status: 400 });
    }
  };
  