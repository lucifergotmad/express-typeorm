import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AppDataSource } from "../../config/data-source";
import { RegisterUserSchema } from "./validations/register-user.schema";

/**
 * @description Register User
 * @access public
 */
const registerUser = asyncHandler(async (req: Request, res: Response) => {});

export { registerUser };
