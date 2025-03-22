import { NextFunction, Request, Response } from "express";
import { HttpError } from "../helpers/index.js";

const isValidId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const numericId = Number(id);

  if (!numericId) {
    return next(HttpError(400, "Invalid id"));
  }

  next();
};

export default isValidId;
