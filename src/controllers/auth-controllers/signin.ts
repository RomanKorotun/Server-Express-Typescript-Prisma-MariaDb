import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import "dotenv/config";
import {
  addRefreshToken,
  getUserByEmail,
} from "../../services/user-services/index.js";
import { HttpError } from "../../helpers/index.js";

const {
  NODE_ENV,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_TIME,
  REFRESH_TOKEN_TIME,
} = process.env;

const signin = async (req: Request, res: Response) => {
  if (
    !ACCESS_TOKEN_SECRET ||
    !REFRESH_TOKEN_SECRET ||
    !ACCESS_TOKEN_TIME ||
    !REFRESH_TOKEN_TIME
  ) {
    throw HttpError(
      500,
      "Error: One or more required values are missing: ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_TIME, REFRESH_TOKEN_TIME"
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
  const tokenKey = nanoid();
  const payload = { id: user.id, token_key: tokenKey };

  const parsedAccessTime = parseInt(ACCESS_TOKEN_TIME);
  const parsedRefreshTime = parseInt(REFRESH_TOKEN_TIME);
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: parsedAccessTime,
  });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: parsedRefreshTime,
  });

  await addRefreshToken({
    token: refreshToken,
    user: { connect: { id: user.id } },
    token_identifier: tokenKey,
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

export default signin;
