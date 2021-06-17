import { endpoint } from "@ev-fns/endpoint";
import { Usuario, UsuarioProps } from "../models/Usuario";
import bcrypt from "bcryptjs";
import { HttpError } from "@ev-fns/errors";

const parseUsuario = ({ nome, email }: UsuarioProps) => ({ nome, email });

export const usuariosPostOne = endpoint(async (req, res) => {
  const { email, senha, nome } = req.body;

  const exists = await Usuario.exists({ email });

  if (exists) {
    throw new HttpError(409, `email "${email}" already exists`);
  }

  const hash = await bcrypt.hash(senha, 12);

  const usuario = await Usuario.create({
    nome,
    email,
    senha: hash,
  });

  console.log(usuario.toObject());

  res.status(201).json(parseUsuario(usuario));
});
