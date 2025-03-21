import { prisma } from "../../prismaClient.js";
import { Prisma } from "@prisma/client";

const addUser = async (userData: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data: userData,
    select: { username: true, email: true },
  });
};

export default addUser;
