import { Prisma } from "@prisma/client";
import { prisma } from "../../prismaClient.js";

const addRefreshToken = async (
  refreshTokenData: Prisma.RefreshTokenCreateInput
) => {
  return await prisma.refreshToken.create({ data: refreshTokenData });
};

export default addRefreshToken;
