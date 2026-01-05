import { dbConnect } from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { jsonError, jsonSuccess } from "@/helpers/apiResponse";
import mongoose, { Mongoose } from "mongoose";
import { UserModel } from "@/model/User";
import { Message } from "@/model/User";

export async function POST(req: Request) {
  await dbConnect();
  const { username, content } = await req.json();
  try {
    const user = await UserModel.findOne({ username });
    if (!user) return jsonError("User not found", 404);
    //is user accepting messages
    if (!user.isAcceptingMessages)
      return jsonError("User not accepting messages", 403);

    const newMessage = { content, createdAt: new Date() };
    user.messages.push(newMessage as Message);
    await user.save();
    return jsonSuccess("Message sent successfully");
  } catch (error) {
    console.error("failed to send message", error as Error);
    return jsonError("Internal Server Error", 500);
  }
}
