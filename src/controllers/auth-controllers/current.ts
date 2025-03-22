import { Response } from "express";
import { ICustomRequest } from "../../interfaces/authInterface";

const current = async (req: ICustomRequest, res: Response) => {
  const { user } = req;
  if (user) {
    res.json({ username: user.username, email: user.email });
  }
};

export default current;
