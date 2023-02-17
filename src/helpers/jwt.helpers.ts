import jwt from "jsonwebtoken";
import { env } from "../config/env-schema";

export const generateToken = (key: string) => {
  return jwt.sign({ key }, env.JWT_SECRET_KEY, {
    expiresIn: env.JWT_LIMIT,
  });
};
