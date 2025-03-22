import express from "express";
import { authentacate, isEmptyBody } from "../../middleware/index.js";
import { signinSchema, signupSchema } from "../../schemas/authSchema.js";
import { ctrlWrapper, isValidBody } from "../../decorators/index.js";
import {
  current,
  refresh,
  signin,
  signup,
} from "../../controllers/auth-controllers/index.js";

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

authRouter.get("/current", authentacate, ctrlWrapper(current));

authRouter.get("/refresh", ctrlWrapper(refresh));

export default authRouter;
