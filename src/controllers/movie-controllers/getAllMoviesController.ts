import { Response } from "express";
import { ICustomRequest } from "../../interfaces/authInterface.js";
import { HttpError } from "../../helpers/index.js";
import getAllMovies from "../../services/movie-services/getAllMovies.js";

const getAllMoviesController = async (req: ICustomRequest, res: Response) => {
  const { user } = req;
  const { page, limit } = req.query;

  if (!user) {
    throw HttpError(401);
  }

  const numericPage = Number(page);
  const numericLimit = Number(limit);

  if (!numericPage || !numericLimit) {
    throw HttpError(400);
  }

  console.log(page, typeof page);
  console.log(limit, typeof limit);

  const allMovies = await getAllMovies(user.id, numericPage, numericLimit);

  res.json(allMovies);
};

export default getAllMoviesController;
