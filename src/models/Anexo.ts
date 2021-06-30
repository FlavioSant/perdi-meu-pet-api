import { createModel, createSchema } from "@ev-fns/mongo";

export interface AnexoProps {
  anexoId: string;
  nome: string;
  mimeType: string;
}

export const Anexo = createModel<AnexoProps>(
  "Anexo",
  createSchema({
    anexoId: {
      type: String,
      required: true,
      unique: true,
    },
    nome: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
  }),
  "anexos",
);
