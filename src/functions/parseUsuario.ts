import { UsuarioProps } from "../models/Usuario";

export const parseUsuario = ({ nome, email }: UsuarioProps) => ({
  nome,
  email,
});
