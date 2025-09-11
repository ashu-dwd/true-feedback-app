import { z } from "zod";

export const acceptMessageSchema = z.object({
  acceptMessags: z.boolean(),
});
