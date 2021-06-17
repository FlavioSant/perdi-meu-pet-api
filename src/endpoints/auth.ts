import { endpoint } from "@ev-fns/endpoint";
import { HttpError } from "@ev-fns/errors";
import { encode } from "@ev-fns/jwt";
import { compare } from "bcryptjs";
import { Usuario, UsuarioProps } from "../models/Usuario";

const parseUsuario = ({ nome, email }: UsuarioProps) => ({ nome, email });

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
