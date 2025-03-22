import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { HttpError } from "../helpers/index.js";
import getUserById from "../services/auth-services/getUserById.js";
import { ICustomRequest } from "../interfaces/authInterface.js";

const { ACCESS_TOKEN_SECRET } = process.env;

const authentacate = async (
  req: ICustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (!ACCESS_TOKEN_SECRET) {
    throw HttpError(
      500,
      "Error: The required value ACCESS_TOKEN_SECRET is missing"
    );
  }
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as JwtPayload;
    const user = await getUserById(id);
    if (!user) {
      return next(HttpError(401, "User not found"));
    }
    req.user = user;
    next();
  } catch (error: any) {
    next(HttpError(401, error.message));
  }
};
export default authentacate;
