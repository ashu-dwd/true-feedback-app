import { email, z } from "zod";

export const usernameValidation = z
  .string()
  .min(3, "Username must be at least 3 characters long.")
  .max(20, "Username can't exceed 20 characters.");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password Must contain atleast 6 characters.")
    .max(15, "Password cannot exceed 15 characters."),
});
