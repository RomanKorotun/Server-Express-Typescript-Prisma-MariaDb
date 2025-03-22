import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { nanoid } from "nanoid";
import { generateToken, HttpError } from "../../helpers/index.js";
import {
  addRefreshToken,
  deleteRefreshToken,
  getRefreshToken,
  getUserById,
} from "../../services/auth-services/index.js";

const { NODE_ENV, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_TIME } = process.env;

const refreshController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!NODE_ENV || !REFRESH_TOKEN_SECRET || !ACCESS_TOKEN_TIME) {
    throw HttpError(
      500,
      "Error: One or more required values are missing: NODE_ENV, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_TIME"
    );
  }

  const { refreshToken: token } = req.cookies;

  if (!token) {
    throw HttpError(401);
  }

  try {
    const { id, token_identifier } = jwt.verify(
      token,
      REFRESH_TOKEN_SECRET
    ) as JwtPayload;

    const user = await getUserById(id);

    if (!user) {
      return next(HttpError(401, "User not found"));
    }

    const params = {
      where: { userId_token_identifier: { userId: id, token_identifier } },
    };

    const refreshToken = await getRefreshToken(params);

    if (!refreshToken) {
      return next(HttpError(401));
    }

    await deleteRefreshToken(params);

    const tokenIdentifier = nanoid();

    const payload = {
      id: user.id,
      token_identifier: tokenIdentifier,
    };

    const parsedAccessTime = parseInt(ACCESS_TOKEN_TIME);

    const newAccessToken = generateToken("access", payload);
    const newRefreshToken = generateToken("refresh", payload);

    await addRefreshToken({
      token: newRefreshToken,
      user: { connect: { id: user.id } },
      token_identifier: tokenIdentifier,
    });

    const isProduction = NODE_ENV === "production";

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      maxAge: parsedAccessTime * 1000,
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
    });

    res.json({
      message:
        "Access and Refresh tokens have been successfully set in cookies",
    });
  } catch (error: any) {
    const { id, token_identifier } = jwt.decode(token) as JwtPayload;

    const params = {
      where: { userId_token_identifier: { userId: id, token_identifier } },
    };

    const refreshToken = await getRefreshToken(params);

    if (refreshToken) {
      await deleteRefreshToken(params);
    }

    return next(HttpError(401, error.message));
  }
};

export default refreshController;
