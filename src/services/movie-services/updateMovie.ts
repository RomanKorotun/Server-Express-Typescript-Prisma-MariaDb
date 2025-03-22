import { Prisma } from "@prisma/client";
import { prisma } from "../../prismaClient.js";

const updateMovie = async (
  id: number,
  userId: number,
  movie: Prisma.MovieUpdateInput
) => {
  return await prisma.movie.update({
    where: { id, userId },
    data: movie,
    select: {
      id: true,
      name: true,
      director: true,
      releaseYear: true,
      poster: true,
    },
  });
};

export default updateMovie;
