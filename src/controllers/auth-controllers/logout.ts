import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ICustomRequest } from "../../interfaces/authInterface.js";
import getRefreshToken from "../../services/auth-services/getRefreshToken.js";
import deleteRefreshToken from "../../services/auth-services/deleteRefreshToken.js";
import { HttpError } from "../../helpers/index.js";

const { NODE_ENV } = process.env;

const logout = async (
  req: ICustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;

  if (user) {
    const { refreshToken: token } = req.cookies;

    if (!token) {
      return next(HttpError(401));
    }

    const { id, token_identifier } = jwt.decode(token) as JwtPayload;

    const params = {
      where: { userId_token_identifier: { userId: id, token_identifier } },
    };

    const refreshToken = await getRefreshToken(params);

    if (refreshToken) {
      await deleteRefreshToken(params);
    }
    const isProduction = NODE_ENV === "production";

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
    });

    res.json({ message: "Logout success" });
  }
};

export default logout;
