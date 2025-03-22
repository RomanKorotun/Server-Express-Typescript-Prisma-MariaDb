import Joi from "joi";

export const addMovieSchema = Joi.object({
  name: Joi.string().required(),
  director: Joi.string().required(),
  releaseYear: Joi.string().required(),
});

export const updateMovieSchema = Joi.object({
  name: Joi.string(),
  director: Joi.string(),
  releaseYear: Joi.string(),
});
