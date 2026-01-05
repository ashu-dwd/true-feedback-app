import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import { jsonBadRequest, jsonError, jsonSuccess } from "@/helpers/apiResponse";
import { User } from "next-auth";

export async function POST(req: Request) {
  await dbConnect();
  //TODO: Implement logic to accept messages yt: https://www.youtube.com/watch?v=MKNA_-wzxMk&list=PLu71SKxNbfoBAaWGtn9GA2PTw0HO0tXzq&index=8&t=455s
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || !user) return jsonError("Unauthorized", 401);

  const userId = user._id;
  const { acceptMessages } = await req.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { acceptMessages },
      { new: true },
    );
    if (!updatedUser) return jsonError("User not found", 404);

    return jsonSuccess(
      { isAcceptingMessages: updatedUser.isAcceptingMessages },
      "Messages acceptance status updated successfully",
    );
  } catch (error) {
    console.error("failed to accept messages", error);
    return jsonError("failed to accept messages", 500);
  }
}
