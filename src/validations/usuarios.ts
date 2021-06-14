import Joi from "joi";

export const usuariosPostOneBody = Joi.object()
  .keys({
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    senha: Joi.string().min(6).required(),
  })
  .required();

export const usuariosVerificarUsuarioPostBody = Joi.object()
  .keys({
    token: Joi.string().required(),
  })
  .required();
