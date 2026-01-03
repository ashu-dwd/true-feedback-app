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
  if (!session) return jsonError("Unauthorized", 401);
}
