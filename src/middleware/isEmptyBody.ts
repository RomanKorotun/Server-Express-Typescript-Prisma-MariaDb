import { NextFunction, Request, Response } from "express";
import { HttpError } from "../helpers/index.js";

const isEmptyBody = (req: Request, res: Response, next: NextFunction) => {
  const { length } = Object.keys(req.body);
  if (!length) {
    return next(HttpError(400));
  }
  next();
};

export default isEmptyBody;
