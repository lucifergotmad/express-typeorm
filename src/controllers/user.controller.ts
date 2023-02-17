import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import httpStatus from "http-status";
import { AppDataSource } from "../config/data-source";
import { UserLevel } from "../constants/user-level.const";
import { hashPassword, matchPassword } from "../helpers/bcrypt.helper";
import { generateToken } from "../helpers/jwt.helpers";
import { User } from "../models/user.model";
import { LoginUserType } from "../validations/login-user.schema";
import { RegisterUserType } from "../validations/register-user.schema";

/**
 * @description Register User
 * @access public
 */
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { user_id, password }: RegisterUserType = req.body;

  const userExists = await AppDataSource.getRepository(User).findOne({
    where: {
      user_id,
    },
  });

  if (userExists) {
    res.status(httpStatus.BAD_REQUEST);
    throw new Error("User id already exists");
  }

  const userEntity = AppDataSource.getRepository(User).create({
    user_id,
    password: await hashPassword(password, 10),
    level: UserLevel.User,
  });

  await AppDataSource.getRepository(User).save(userEntity);

  if (userEntity) {
    res.status(httpStatus.CREATED).json({
      message: "Berhasil Register!",
      data: {
        user_id: userEntity.user_id,
        level: userEntity.level,
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

  const user = await AppDataSource.getRepository(User).findOne({
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
