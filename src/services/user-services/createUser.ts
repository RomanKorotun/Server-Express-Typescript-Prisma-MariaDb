import { prisma } from "../../prismaClient.js";
import { Prisma } from "@prisma/client";

const createUser = async (userData: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data: userData,
    select: { username: true, email: true },
  });
};

export default createUser;
