import Joi from "joi";

export const anexosGetOneParams = Joi.object()
  .keys({
    anexoId: Joi.string().required(),
  })
  .required();
