import { Response } from "express";
import { ICustomRequest } from "../../interfaces/authInterface.js";
import { HttpError } from "../../helpers/index.js";
import { deleteMovie, getMovie } from "../../services/movie-services/index.js";

const deleteMovieController = async (req: ICustomRequest, res: Response) => {
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

  const deletedMovie = await deleteMovie(numericId, user.id);

  res.json(deletedMovie);
};

export default deleteMovieController;
