import Joi from "joi";

export const publicacoesPostBody = Joi.object()
  .keys({
    situacao: Joi.valid("adocao", "desaparecido", "encontrado").required(),
    categoria: Joi.valid("cachorro", "gato", "outros").required(),
    porte: Joi.valid("pequeno", "medio", "grande").required(),
    sexo: Joi.valid("macho", "femea", "outros").required(),
    celular: Joi.string(),
    cor: Joi.string(),
    nome: Joi.string(),
    observacoes: Joi.string(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    isResolvido: Joi.boolean(),
    anexos: Joi.array().items(Joi.string().required()),
  })
  .required();

export const publicacoesPatchBody = Joi.object()
  .keys({
    situacao: Joi.valid("adocao", "desaparecido", "encontrado"),
    categoria: Joi.valid("cachorro", "gato", "outros"),
    porte: Joi.valid("pequeno", "medio", "grande"),
    sexo: Joi.valid("macho", "femea", "outros"),
    celular: Joi.string(),
    cor: Joi.string(),
    nome: Joi.string(),
    observacoes: Joi.string(),
    latitude: Joi.number(),
    longitude: Joi.number(),
    isResolvido: Joi.boolean(),
    anexos: Joi.array().items(Joi.string()),
  })
  .min(1)
  .required();

export const publicacoesGetParams = Joi.object()
  .keys({ _id: Joi.string().required() })
  .required();
