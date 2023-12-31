import { connectoToDB } from "@utils/database";
import User from "@models/User";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { enteredPassword, enteredEmail, username, firstName, lastName } = await request.json();
  try {
    await connectoToDB();
    const user = await User.create({
      email: enteredEmail,
      password: enteredPassword,
      username,
      firstName,
      lastName
    });
    return NextResponse.json(JSON.stringify(user), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Failed to create a new user" }), { status: 500 });
  }
};
