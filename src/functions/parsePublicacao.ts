import { parseUsuario } from "./parseUsuario";
import { UsuarioProps } from "../models/Usuario";

export const parsePublicacao = (
  { _id, ...props }: Record<string, any>,
  usuario?: UsuarioProps | undefined,
): Record<string, any> => {
  delete props.usuarioId;
  delete props.__v;
  delete props.localizacao;

  if (usuario) {
    props.usuario = parseUsuario(usuario);
  }

  return {
    publicacaoId: _id,
    ...props,
  };
};
