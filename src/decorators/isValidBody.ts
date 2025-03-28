import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import { HttpError } from "../helpers/index.js";

const isValidBody = (schema: Schema) => {
  const func = (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

export default isValidBody;
