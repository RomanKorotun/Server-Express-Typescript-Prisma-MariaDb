import { Prisma } from "@prisma/client";
import { prisma } from "../../prismaClient.js";

const deleteRefreshToken = async (params: Prisma.RefreshTokenDeleteArgs) => {
  return await prisma.refreshToken.delete(params);
};

export default deleteRefreshToken;
