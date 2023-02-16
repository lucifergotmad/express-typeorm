import { Router } from "express";
import { RegisterUserSchema } from "../controllers/user/validations/register-user.schema";
import { validate } from "../middlewares/validate";

const router = Router();

router.route("/register").post(validate(RegisterUserSchema));

export default router;
