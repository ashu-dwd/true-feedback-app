import { NextRequest } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";
import { UserModel } from "@/model/User";
import {
  jsonBadRequest,
  jsonError,
  jsonSuccess,
  jsonValidationError,
} from "@/helpers/apiResponse";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(req: NextRequest): Promise<Response> {
  try {
    await dbConnect();

    // Example: http://localhost:3000/api/check-username-unique?username=raghav
    const { searchParams } = new URL(req.url);
    const queryParam = {
      username: searchParams.get("username") ?? undefined,
    };

    const result = UsernameQuerySchema.safeParse(queryParam);

    if (!result.success) {
      // Extract readable validation errors (zod)
      const usernameErrors = result.error.format().username?._errors || [];
      if (usernameErrors.length > 0) {
        return jsonValidationError(usernameErrors, "Invalid username");
      }
      return jsonBadRequest("Invalid Query Parameter");
    }

    const username = result.data.username;

    // Check if username already exists
    const existing = await UserModel.findOne({
      username,
      isVerified: true,
    }).lean();

    return jsonSuccess(
      { isUnique: existing ? false : true },
      existing ? "Username already exists" : "Username is available",
    );
  } catch (error: any) {
    console.error("Error checking username:", error);
    return jsonError("Error Checking Username", 500);
  }
}
