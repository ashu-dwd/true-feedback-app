import { dbConnect } from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { jsonError, jsonSuccess } from "@/helpers/apiResponse";
import mongoose, { Mongoose } from "mongoose";
import { UserModel } from "@/model/User";

export async function GET(req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || !user) return jsonError("Unauthorized", 401);
  const userId = new mongoose.Types.ObjectId(user._id);
  try {
    const user = await UserModel.aggregate([
      {
        $match: {
          id: userId,
        },
      },
      {
        $unwind: "messages",
      },
      {
        $sort: {
          "messages.createdAt": -1,
        },
      },
      {
        $group: {
          _id: "$_id",
          messages: { $push: "$messages" },
        },
      },
    ]);
    if (!user || user.length === 0) return jsonError("User not found", 404);
    return jsonSuccess(user);
  } catch (error) {
    console.error(error as Error);
    return jsonError("Internal Server Error", 500);
  }
}
