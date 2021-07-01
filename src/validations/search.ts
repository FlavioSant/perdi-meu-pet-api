import Joi from "joi";

export const searchPostBody = Joi.object()
  .keys({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  })
  .required();
