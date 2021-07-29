import { endpoint } from "@ev-fns/endpoint";
import { HttpError } from "@ev-fns/errors";
import { Publicacao } from "../models/Publicacao";
import { Usuario } from "../models/Usuario";
import { parsePublicacao } from "../functions/parsePublicacao";
import { isValidObjectId } from "mongoose";

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

export const publicacoesGetOne = endpoint(async (req, res) => {
  const usuario = await Usuario.findOne({ email: req.token.email });

  if (!usuario) {
    throw new HttpError(401, "invalid token");
  }

  const { _id } = req.params;

  if (!isValidObjectId(_id)) {
    throw new HttpError(404, "Not found");
  }

  const item = await Publicacao.findById(_id);

  if (!item) {
    throw new HttpError(404, "Not found");
  }

  const publicacao = parsePublicacao(item.toObject(), usuario);

  res.status(200).json(publicacao);
});

export const minhasPublicacoes = endpoint(async (req, res) => {
  const usuario = await Usuario.findOne({ email: req.token.email });

  if (!usuario) {
    throw new HttpError(401, "invalid token");
  }

  const items = await Publicacao.find({ usuarioId: usuario.id });

  if (!items) {
    throw new HttpError(404, "Not found");
  }

  const parsedItems = items.map((item) =>
    parsePublicacao(item.toObject(), usuario),
  );

  res.status(200).json(parsedItems);
});

export const publicacoesPatch = endpoint(async (req, res) => {
  const usuario = await Usuario.findOne({ email: req.token.email });

  if (!usuario) {
    throw new HttpError(401, "invalid token");
  }

  const { _id } = req.params;

  if (!isValidObjectId(_id)) {
    throw new HttpError(404, "Not found");
  }

  const item = await Publicacao.findById(_id);

  if (!item) {
    throw new HttpError(404, "Not found");
  }

  const { latitude, longitude } = req.body;

  const body = {
    ...req.body,
  };

  if (latitude != null && longitude != null) {
    body.localizacao = {
      type: "Point",
      coordinates: [longitude, latitude],
    };
  }

  const inserted = await Publicacao.findOneAndUpdate(
    { _id },
    {
      ...body,
    },
  );

  if (!inserted) {
    throw new Error(`failed to find and update`);
  }

  const publicacao = parsePublicacao(inserted.toObject(), usuario);

  res.status(200).json(publicacao);
});

export const publicacoesDelete = endpoint(async (req, res) => {
  const usuario = await Usuario.findOne({ email: req.token.email });

  if (!usuario) {
    throw new HttpError(401, "invalid token");
  }

  const { _id } = req.params;

  if (!isValidObjectId(_id)) {
    throw new HttpError(404, "Not found");
  }

  const item = await Publicacao.findById(_id);

  if (!item) {
    throw new HttpError(404, "Not found");
  }

  await Publicacao.deleteOne({ _id });

  res.status(204).end();
});
