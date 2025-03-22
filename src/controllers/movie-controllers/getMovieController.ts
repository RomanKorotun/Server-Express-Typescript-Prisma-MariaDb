import { Response } from "express";
import { ICustomRequest } from "../../interfaces/authInterface.js";
import { HttpError } from "../../helpers/index.js";
import { getMovie } from "../../services/movie-services/index.js";

const getMovieController = async (req: ICustomRequest, res: Response) => {
  const { user } = req;
  const { id } = req.params;
  const numericId = Number(id);

  if (!user) {
    throw HttpError(401);
  }

  const movie = await getMovie(numericId, user.id);

  if (!movie) {
    throw HttpError(404);
  }

  res.json(movie);
};

export default getMovieController;
