import express from "express";
import {
  authenticate,
  isEmptyBody,
  isEmptyBodyOrFile,
  isValidId,
  upload,
} from "../../middleware/index.js";
import isValidBody from "../../decorators/isValidBody.js";
import { updateMovieSchema } from "../../schemas/movieSchema.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import {
  addMovieController,
  deleteMovieController,
  getAllMoviesController,
  getMovieController,
  updateMovieController,
} from "../../controllers/movie-controllers/index.js";

const movieRouter = express.Router();

movieRouter.get(
  "/:id",
  authenticate,
  isValidId,
  ctrlWrapper(getMovieController)
);

movieRouter.get("/", authenticate, ctrlWrapper(getAllMoviesController));

movieRouter.post(
  "/",
  authenticate,
  upload.single("poster"),
  isEmptyBody,
  isValidBody(updateMovieSchema),
  ctrlWrapper(addMovieController)
);

movieRouter.put(
  "/:id",
  authenticate,
  isValidId,
  upload.single("poster"),
  isEmptyBodyOrFile,
  isValidBody(updateMovieSchema),
  ctrlWrapper(updateMovieController)
);

movieRouter.delete(
  "/:id",
  authenticate,
  isValidId,
  ctrlWrapper(deleteMovieController)
);

export default movieRouter;
