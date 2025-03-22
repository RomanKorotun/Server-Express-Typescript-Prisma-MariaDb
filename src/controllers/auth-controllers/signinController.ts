import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import "dotenv/config";
import {
  addRefreshToken,
  getUserByEmail,
} from "../../services/auth-services/index.js";
import { generateToken, HttpError } from "../../helpers/index.js";

const { NODE_ENV, ACCESS_TOKEN_TIME } = process.env;

const signinController = async (req: Request, res: Response) => {
  if (!NODE_ENV || !ACCESS_TOKEN_TIME) {
    throw HttpError(
      500,
      "Error: One or more required values are missing: NODE_ENV, ACCESS_TOKEN_TIME"
    );
  }

  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    throw HttpError(401, "Incorrect login or password");
  }

  const comparePassword = await bcryptjs.compare(password, user.password);

  if (!comparePassword) {
    throw HttpError(401, "Incorrect login or password");
  }

  const tokenIdentifier = nanoid();

  const payload = { id: user.id, token_identifier: tokenIdentifier };

  const parsedAccessTime = parseInt(ACCESS_TOKEN_TIME);

  const accessToken = generateToken("access", payload);
  const refreshToken = generateToken("refresh", payload);

  await addRefreshToken({
    token: refreshToken,
    user: { connect: { id: user.id } },
    token_identifier: tokenIdentifier,
  });

  const isProduction = NODE_ENV === "production";

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    maxAge: parsedAccessTime * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
  });

  res.json({
    message: "Access and Refresh tokens have been successfully set in cookies",
  });
};

export default signinController;
