import { NextFunction, Request, Response } from "express";
import { HttpError } from "../helpers/index.js";

const isEmptyBodyOrFile = (req: Request, res: Response, next: NextFunction) => {
  const hasTextFields = Object.keys(req.body).length > 0;
  const hasFile = req.file;
  if (!hasTextFields && !hasFile) {
    return next(HttpError(400));
  }
  next();
};

export default isEmptyBodyOrFile;
