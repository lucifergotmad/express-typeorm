import { z } from "zod";

export const LoginUserSchema = z.object({
  user_id: z.string({ required_error: "User Id is required" }),
  password: z.string({ required_error: "Password is required" }),
});

export type LoginUserType = z.infer<typeof LoginUserSchema>;
