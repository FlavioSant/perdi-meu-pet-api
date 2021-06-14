import { endpoint } from "@ev-fns/endpoint";
import { Usuario, UsuarioProps } from "../models/Usuario";
import { nanoid } from "nanoid";
import { HttpError } from "@ev-fns/errors";
import bcrypt from "bcryptjs";

const parseUsuario = ({ nome, email }: UsuarioProps) => ({ nome, email });

export const usuariosPostOne = endpoint(async (req, res) => {
  const { email, senha, nome } = req.body;

  const hash = await bcrypt.hash(senha, 12);

  const usuario = await Usuario.create({
    nome,
    email,
    senha: hash,
    status: { verified: false, token: nanoid() },
  });

  console.log(usuario.toObject());

  res.status(201).json(parseUsuario(usuario));
});

export const usuariosVerificarUsuarioPost = endpoint(async (req, res) => {
  const { token } = req.body;

  const usuario = await Usuario.findOneAndUpdate(
    {
      "status.verified": false,
      "status.token": token,
    },
    { status: { verified: true } },
    { new: true },
  );

  if (!usuario) {
    throw new HttpError(401, "Unauthorized");
  }

  console.log(usuario.toObject());

  res.status(200).json(parseUsuario(usuario));
});
