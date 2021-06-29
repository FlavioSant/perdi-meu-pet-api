import Joi from "joi";

export const publicacoesPostBody = Joi.object()
  .keys({
    tipo: Joi.valid("adocao", "perdido", "encontrado").required(),
    categoria: Joi.valid("cachorro", "gato", "outros").required(),
    porte: Joi.valid("pequeno", "medio", "grande").required(),
    sexo: Joi.valid("macho", "femea", "outros").required(),
    cor: Joi.string(),
    nome: Joi.string(),
    observacoes: Joi.string(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  })
  .required();
