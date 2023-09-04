import Media from "@models/Media";
import { connectoToDB } from "@utils/database";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const data = await request.json();
  console.log("images", data);

  try {
    await connectoToDB();
    const medias = await Media.insertMany(data);
    return NextResponse.json({ object: JSON.stringify(medias) }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 400 });
  }

  // const response = await request.formData();
  // try {
  //     const res = await fetch('https://api.cloudinary.com/v1_1/dqonycdut/image/upload', {
  //         method: 'POST',
  //         body: response
  //     });
  //     const data = await res.json();
  //     console.log(data, res.status)
  //     return NextResponse.json({ error: "eorrr" }, { status: 200 });
  // }
  // catch (error) {
  //     console.log(error);
  // }
};
