import { NextRequest } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { z } from "zod";
import { UserModel } from "@/model/User";
import {
  jsonBadRequest,
  jsonError,
  jsonSuccess,
  jsonValidationError,
} from "@/helpers/apiResponse";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { username, code } = await req.json();
    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodedUsername });
    if (!user) {
      return jsonBadRequest("User not found");
    }
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();
    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();
      return jsonSuccess("Code verified successfully");
    } else if (!isCodeValid) {
      return jsonBadRequest("Invalid code");
    } else if (!isCodeNotExpired) {
      return jsonBadRequest("Expired code");
    }
    return jsonBadRequest("Incorrect verification code");
  } catch (error: any) {
    console.error("Error verifying code:", error);
    jsonError("Error verifying code", 500);
  }
}
