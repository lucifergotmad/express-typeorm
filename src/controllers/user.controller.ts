import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import httpStatus from "http-status";
import { UserLevel } from "../constants/user-level.const";
import { hashPassword, matchPassword } from "../helpers/bcrypt.helper";
import { generateToken } from "../helpers/jwt.helpers";
import { UserRepository } from "../models/user.model";
import { LoginUserType } from "../validations/login-user.schema";
import { RegisterUserType } from "../validations/register-user.schema";

/**
 * @description Register User
 * @access public
 */
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { user_id, password }: RegisterUserType = req.body;

  const userExists = await UserRepository.findOne({
    where: {
      user_id,
    },
  });

  if (userExists) {
    res.status(httpStatus.BAD_REQUEST);
    throw new Error("User id already exists");
  }

  const user = UserRepository.create({
    user_id,
    password: await hashPassword(password, 10),
    level: UserLevel.User,
  });

  if (user) {
    res.status(httpStatus.CREATED).json({
      message: "Berhasil Register!",
      data: {
        user_id: user.user_id,
        level: user.level,
      },
    });
  } else {
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
    throw new Error("Register Gagal! Mohon cek kembali data!");
  }
});

/**
 * @description Login User
 * @access public
 */
const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { user_id, password }: LoginUserType = req.body;

  const user = await UserRepository.findOne({
    where: {
      user_id,
    },
  });

  if (user && (await matchPassword(password, user.password))) {
    res.status(httpStatus.OK).json({
      message: "Berhasil Login",
      data: {
        user_id: user.user_id,
        level: user.level,
        token: generateToken(user.user_id),
      },
    });
  } else {
    res.status(httpStatus.BAD_REQUEST);
    throw new Error("Invalid Email atau Password");
  }
});

export { registerUser, loginUser };
