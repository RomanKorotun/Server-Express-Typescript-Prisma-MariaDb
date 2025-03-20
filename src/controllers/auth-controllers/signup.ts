import { NextFunction, Request, Response } from "express";
import { hashPassword, HttpError } from "../../helpers/index.js";
import {
  createUser,
  getUserByEmail,
} from "../../services/user-services/index.js";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (user) {
    throw HttpError(409);
  }
  const hashedPassword = await hashPassword(password);
  const newUser = await createUser({ ...req.body, password: hashedPassword });
  res.status(201).json(newUser);
};

export default signup;
