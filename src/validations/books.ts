import Joi from "joi";

export const booksPostOneBody = Joi.object()
  .keys({
    title: Joi.string().required(),
    author: Joi.string().required(),
  })
  .required();

export const booksGetOneParams = Joi.object()
  .keys({
    bookId: Joi.number().integer().required(),
  })
  .required();

export const booksPatchOneBody = Joi.object()
  .keys({
    title: Joi.string(),
    author: Joi.string(),
  })
  .min(1)
  .required();
