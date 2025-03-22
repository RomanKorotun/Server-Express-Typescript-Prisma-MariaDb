import { prisma } from "../../prismaClient.js";

const getMovie = async (id: number, userId: number) => {
  return await prisma.movie.findFirst({
    where: { id, userId },
    select: {
      id: true,
      name: true,
      director: true,
      releaseYear: true,
      poster: true,
    },
  });
};

export default getMovie;
