import Joi from "joi";

export const searchPostBody = Joi.object()
  .keys({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  })
  .required();

export const searchFilterPostBody = Joi.object()
  .keys({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    situacao: Joi.valid("adocao", "desaparecido", "encontrado").required(),
    categoria: Joi.valid("cachorro", "gato", "outros").required(),
    porte: Joi.valid("pequeno", "medio", "grande"),
    sexo: Joi.valid("macho", "femea", "outros"),
    cor: Joi.string(),
    nome: Joi.string(),
  })
  .required();
