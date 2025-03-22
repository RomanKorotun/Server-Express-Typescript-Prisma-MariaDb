import { Response } from "express";
import path from "path";
import fs from "fs/promises";
import { ICustomRequest } from "../../interfaces/authInterface.js";
import getMovie from "../../services/movie-services/getMovie.js";
import { updateMovie } from "../../services/movie-services/index.js";
import { HttpError } from "../../helpers/index.js";

const updateMovieController = async (req: ICustomRequest, res: Response) => {
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

  const movieData = { ...req.body };

  if (req.file) {
    const { path: oldPath, filename } = req.file;

    const newPath = path.resolve("public", "poster", filename);

    await fs.rename(oldPath, newPath);

    const poster = path.join("poster", filename);

    movieData.poster = poster;
  }

  const updatedMoviie = await updateMovie(numericId, user.id, movieData);

  res.json(updatedMoviie);
};

export default updateMovieController;
