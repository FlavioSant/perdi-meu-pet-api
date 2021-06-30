import { createModel, createSchema } from "@ev-fns/mongo";
import { Types } from "mongoose";

export interface PublicacaoProps {
  tipo: "adocao" | "perdido" | "encontrado";
  categoria: "cachorro" | "gato" | "outros";
  porte: "pequeno" | "medio" | "grande";
  sexo: "macho" | "femea" | "outros";
  cor?: string;
  nome?: string;
  observacoes?: string;
  latitude: number;
  longitude: number;
  usuarioId: string;
  anexos: string[];
}

export const Publicacao = createModel<PublicacaoProps>(
  "Publicacao",
  createSchema({
    tipo: {
      type: String,
      enum: ["adocao", "perdido", "encontrado"],
      required: true,
    },
    categoria: {
      type: String,
      enum: ["cachorro", "gato", "outros"],
      required: true,
    },
    porte: {
      type: String,
      enum: ["pequeno", "medio", "grande"],
      required: true,
    },
    sexo: {
      type: String,
      enum: ["macho", "femea", "outros"],
      required: true,
    },
    cor: {
      type: String,
    },
    nome: {
      type: String,
    },
    observacoes: {
      type: String,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    usuarioId: {
      type: Types.ObjectId as any,
      ref: "Usuario",
      required: true,
    },
    anexos: {
      type: [String],
      required: true,
    },
  }),
  "publicacoes",
);
