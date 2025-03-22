import { prisma } from "../../prismaClient.js";

const getAllMovies = async (userId: number, page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const allMovies = await prisma.movie.findMany({
    where: { userId },
    skip,
    take: limit,
  });

  const totalMovies = await prisma.movie.count({ where: { userId } });

  const totalPage = Math.ceil(totalMovies / limit);

  return { movies: allMovies, totalPage, currentPage: page };
};

export default getAllMovies;
