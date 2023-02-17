import { Router } from "express";
import { RegisterUserSchema } from "../validations/register-user.schema";
import { validate } from "../middlewares/validate";
import { loginUser, registerUser } from "../controllers/user.controller";
import { BodySchema } from "../validations/base-schema";
import { LoginUserSchema } from "../validations/login-user.schema";

const router = Router();

router
  .route("/register")
  .post(validate(BodySchema(RegisterUserSchema)), registerUser);

router.route("/login").post(validate(BodySchema(LoginUserSchema)), loginUser);

export default router;
