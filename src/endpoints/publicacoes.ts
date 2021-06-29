import { endpoint } from "@ev-fns/endpoint";
import { HttpError } from "@ev-fns/errors";
import { parseUsuario } from "../functions/parseUsuario";
import { Publicacao } from "../models/Publicacao";
import { Usuario } from "../models/Usuario";

const parse = ({ _id, ...rest }: Record<string, any>): Record<string, any> => ({
  publicacaoId: _id,
  ...rest,
});

export const publicacoesPost = endpoint(async (req, res) => {
  const usuario = await Usuario.findOne({ email: req.token.email });

  if (!usuario) {
    throw new HttpError(401, "invalid token");
  }

  const inserted = await Publicacao.create({
    ...req.body,
    usuarioId: usuario._id,
  });

  const publicacao = parse(inserted.toObject());

  delete publicacao.usuarioId;
  delete publicacao.__v;

  publicacao.usuario = parseUsuario(usuario);

  res.status(200).json(publicacao);
});
