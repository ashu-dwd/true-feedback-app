import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export const POST = async (request: Request) => {
  await dbConnect();
  try {
    const { username, email, password } = await request.json(); // Parse JSON data from the request body
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: false,
    });
    if (existingUserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username already exists",
        },
        {
          status: 409,
        }
      );
    }
    const verificationCode = Math.floor(Math.random() * 100000)
      .toString()
      .padStart(6, "0"); //return a random number between 0 and 999999 as a string with leading zeros
    const existingUserByEmail = await UserModel.findOne({ email });
    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exists with same email.",
          },
          {
            status: 409,
          }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 12); // Hash the password using bcrypt
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verificationCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 360000);
        await existingUserByEmail.save();
      }
      return Response.json(
        {
          success: false,
          message: "Email already exists",
        },
        {
          status: 409,
        }
      );
    } else {
      const hashedPassword = await bcrypt.hash(password, 12); // Hash the password using bcrypt
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
    //send verification email to user
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verificationCode
    );
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: "Failed to send verification email. Please try again later.",
        },
        {
          status: 500,
        }
      );
    }
    // Return a response indicating successful registration
    return Response.json(
      {
        success: true,
        message:
          "Registration successful! A verification code has been sent to your email address.",
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    console.error("Error registering user:", err);
    return Response.json(
      {
        success: false,
        message: "An error occurred while registering the user.",
      },
      {
        status: 500,
      }
    );
  }
};
