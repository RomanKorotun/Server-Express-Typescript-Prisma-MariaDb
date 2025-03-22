import { Response } from "express";
import path from "path";
import fs from "fs/promises";
import { ICustomRequest } from "../../interfaces/authInterface.js";
import { addMovie } from "../../services/movie-services/index.js";

const addMovieController = async (req: ICustomRequest, res: Response) => {
  const { user } = req;

  if (user) {
    const defaultPoster = "default_poster.jpg";

    let poster = path.resolve("poster", defaultPoster);

    if (req.file) {
      const { path: oldPath, filename } = req.file;

      const newPath = path.resolve("public", "poster", filename);

      await fs.rename(oldPath, newPath);

      poster = path.join("poster", filename);
    }

    const movie = await addMovie({
      ...req.body,
      poster,
      user: { connect: { id: user.id } },
    });

    res.status(201).json(movie);
  }
};

export default addMovieController;
