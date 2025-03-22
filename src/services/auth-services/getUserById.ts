import { prisma } from "../../prismaClient.js";

const getUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

export default getUserById;
