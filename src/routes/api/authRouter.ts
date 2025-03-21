import express from "express";
import { isEmptyBody } from "../../middleware/index.js";
import { signinSchema, signupSchema } from "../../schemas/authSchema.js";
import { ctrlWrapper, isValidBody } from "../../decorators/index.js";
import { signin, signup } from "../../controllers/auth-controllers/index.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  isEmptyBody,
  isValidBody(signupSchema),
  ctrlWrapper(signup)
);

authRouter.post(
  "/signin",
  isEmptyBody,
  isValidBody(signinSchema),
  ctrlWrapper(signin)
);

export default authRouter;
