import Joi from "joi";

export const authSignUpPostBody = Joi.object()
  .keys({
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    senha: Joi.string().min(6).required(),
  })
  .required();

export const authSignInPostBody = Joi.object()
  .keys({
    email: Joi.string().email().lowercase().required(),
    senha: Joi.string().required(),
  })
  .required();
