import { Prisma } from "@prisma/client";
import { Request } from "express";

export interface ICustomRequest extends Request {
  user?: Prisma.UserGetPayload<{}>;
}
