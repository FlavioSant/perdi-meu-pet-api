import Joi from "joi";

export const authSignInPostBody = Joi.object()
  .keys({
    email: Joi.string().email().lowercase().required(),
    senha: Joi.string().required(),
  })
  .required();
