import { createModel, createSchema } from "@ev-fns/mongo";

export interface UsuarioProps {
  nome: string;
  email: string;
  senha: string;
  status: {
    verified: boolean;
    token?: string;
  };
  reset?: {
    token: string;
    expiresAt: Date;
  };
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
    status: {
      type: createSchema({
        verified: {
          type: Boolean,
          required: true,
        },
        token: {
          type: String,
        },
      }),
      required: true,
    },
    reset: {
      type: createSchema({
        token: {
          type: String,
          required: true,
        },
        expiresAt: {
          type: Date,
          required: true,
        },
      }),
    },
  }),
  "usuarios",
);
