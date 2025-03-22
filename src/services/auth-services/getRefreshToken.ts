import { Prisma } from "@prisma/client";
import { prisma } from "../../prismaClient.js";

const getRefreshToken = async (params: Prisma.RefreshTokenFindUniqueArgs) => {
  return await prisma.refreshToken.findUnique(params);
};

export default getRefreshToken;
