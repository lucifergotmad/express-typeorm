import { z } from "zod";

export const RegisterUserSchema = z.object({
  user_id: z.string({ required_error: "User Id is required" }),
  password: z.string({ required_error: "Password is required" }),
});

export type RegisterUserType = z.infer<typeof RegisterUserSchema>;
