import { prisma } from "../../prismaClient.js";

const deleteMovie = async (id: number, userId: number) => {
  return await prisma.movie.delete({
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

export default deleteMovie;
