import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { jsonConflict, jsonCreated, jsonError } from "@/helpers/apiResponse";

export const POST = async (request: Request): Promise<Response> => {
  try {
    await dbConnect();

    const { username, email, password } = await request.json();

    // Check for existing username (unverified)
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: false,
    });
    if (existingUserVerifiedByUsername) {
      return jsonConflict("Username already exists");
    }

    // Generate verification code
    const verificationCode = Math.floor(Math.random() * 100000)
      .toString()
      .padStart(6, "0");

    // Check if a user with the email already exists
    const existingUserByEmail = await UserModel.findOne({ email });
    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return jsonConflict("User already exists with same email.");
      } else {
        // Update the existing (unverified) user with new password & verification code
        const hashedPassword = await bcrypt.hash(password, 12);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verificationCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 360000);
        await existingUserByEmail.save();

        // Preserve original behavior: return conflict indicating email exists
        return jsonConflict("Email already exists");
      }
    } else {
      // Create a new user
      const hashedPassword = await bcrypt.hash(password, 12);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode: verificationCode,
        isVerified: false,
        verifyCodeExpiry: expiryDate,
        isAcceptingMessages: true,
        messages: [],
      });
      await newUser.save();
    }

    // Send verification email for newly created user
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verificationCode,
    );
    if (!emailResponse.success) {
      return jsonError(
        "Failed to send verification email. Please try again later.",
        500,
      );
    }

    // Successful registration
    return jsonCreated(
      undefined,
      "Registration successful! A verification code has been sent to your email address.",
    );
  } catch (err) {
    console.error("Error registering user:", err);
    return jsonError("An error occurred while registering the user.", 500);
  }
};
