import express from "express";
import { isEmptyBody } from "../../middleware/index.js";
import { signupSchema } from "../../schemas/authSchema.js";
import { ctrlWrapper, isValidBody } from "../../decorators/index.js";
import { signup } from "../../controllers/auth-controllers/index.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  isEmptyBody,
  isValidBody(signupSchema),
  ctrlWrapper(signup)
);

export default authRouter;
