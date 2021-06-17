import { createModel, createSchema } from "@ev-fns/mongo";

export interface UsuarioProps {
  nome: string;
  email: string;
  senha: string;
}

export const Usuario = createModel<UsuarioProps>(
  "Usuario",
  createSchema({
    nome: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    senha: {
      type: String,
      required: true,
    },
  }),
  "usuarios",
);
