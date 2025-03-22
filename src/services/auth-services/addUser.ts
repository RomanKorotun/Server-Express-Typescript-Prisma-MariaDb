import { Prisma } from "@prisma/client";
import { prisma } from "../../prismaClient.js";

const addUser = async (userData: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data: userData,
    select: { username: true, email: true },
  });
};

export default addUser;
