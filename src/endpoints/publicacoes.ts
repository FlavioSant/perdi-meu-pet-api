import { endpoint } from "@ev-fns/endpoint";
import { HttpError } from "@ev-fns/errors";
import { Publicacao } from "../models/Publicacao";
import { Usuario } from "../models/Usuario";
import { parsePublicacao } from "../functions/parsePublicacao";

export const publicacoesPost = endpoint(async (req, res) => {
  const usuario = await Usuario.findOne({ email: req.token.email });

  if (!usuario) {
    throw new HttpError(401, "invalid token");
  }

  const { latitude, longitude } = req.body;

  const inserted = await Publicacao.create({
    ...req.body,
    usuarioId: usuario._id,
    localizacao: {
      type: "Point",
      coordinates: [longitude, latitude],
    },
  });

  const publicacao = parsePublicacao(inserted.toObject(), usuario);

  res.status(200).json(publicacao);
});
