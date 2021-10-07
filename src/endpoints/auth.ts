import { endpoint } from "@ev-fns/endpoint";
import { HttpError } from "@ev-fns/errors";
import { encode } from "@ev-fns/jwt";
import { compare } from "bcryptjs";
import { Usuario } from "../models/Usuario";
import bcrypt from "bcryptjs";
import { parseUsuario } from "../functions/parseUsuario";

export const authSingUpPost = endpoint(async (req, res) => {
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

  res.status(201).json(parseUsuario(usuario));
});

export const authSingInPost = endpoint(async (req, res) => {
  const { email, senha } = req.body;

  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    throw new HttpError(401, "invalid email or password");
  }

  const isMatch = await compare(senha, usuario.senha);

  if (!isMatch) {
    throw new HttpError(401, "invalid email or password");
  }

  const token = await encode(parseUsuario(usuario), process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.status(200).json({ token, usuario: parseUsuario(usuario) });
});
