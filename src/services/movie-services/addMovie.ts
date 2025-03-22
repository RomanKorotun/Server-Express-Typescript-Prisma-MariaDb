import { Prisma } from "@prisma/client";
import { prisma } from "../../prismaClient.js";

const addMovie = async (movie: Prisma.MovieCreateInput) => {
  return await prisma.movie.create({
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

export default addMovie;
