import { prisma } from "../../prismaClient.js";

const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export default getUserByEmail;
