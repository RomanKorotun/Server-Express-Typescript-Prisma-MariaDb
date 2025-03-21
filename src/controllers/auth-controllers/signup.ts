import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { HttpError } from "../../helpers/index.js";
import { addUser, getUserByEmail } from "../../services/user-services/index.js";

const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (user) {
    throw HttpError(409);
  }
  const hashPassword = await bcryptjs.hash(password, 10);
  const newUser = await addUser({ ...req.body, password: hashPassword });
  res.status(201).json(newUser);
};

export default signup;
