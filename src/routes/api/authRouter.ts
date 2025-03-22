import express from "express";
import { authenticate, isEmptyBody } from "../../middleware/index.js";
import { signinSchema, signupSchema } from "../../schemas/authSchema.js";
import { ctrlWrapper, isValidBody } from "../../decorators/index.js";
import {
  currentController,
  logoutController,
  refreshController,
  signinController,
  signupController,
} from "../../controllers/auth-controllers/index.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  isEmptyBody,
  isValidBody(signupSchema),
  ctrlWrapper(signupController)
);

authRouter.post(
  "/signin",
  isEmptyBody,
  isValidBody(signinSchema),
  ctrlWrapper(signinController)
);

authRouter.get("/current", authenticate, ctrlWrapper(currentController));

authRouter.get("/refresh", ctrlWrapper(refreshController));

authRouter.post("/logout", authenticate, ctrlWrapper(logoutController));

export default authRouter;
