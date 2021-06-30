import { endpoint } from "@ev-fns/endpoint";
import { HttpError } from "@ev-fns/errors";
import { Anexo } from "../models/Anexo";
import fs from "fs";
import path from "path";

export const anexosPostOne = endpoint(async (req, res) => {
  const { file } = req;

  if (!file) {
    throw new HttpError(400, `field "anexo" is required`);
  }

  const anexo = await Anexo.create({
    anexoId: file.filename,
    mimeType: file.mimetype,
    nome: file.originalname,
  });

  res.status(201).json({
    anexoId: anexo.anexoId,
    mimeType: anexo.mimeType,
    nome: anexo.nome,
  });
});

export const anexosGetOne = endpoint(async (req, res) => {
  const { anexoId } = req.params;

  const anexo = await Anexo.findOne({ anexoId });
  if (!anexo) {
    throw new HttpError(404, "Not found");
  }

  const file = fs.createReadStream(
    path.join(__dirname, "..", "..", "storage", anexoId),
  );

  file.pipe(
    res
      .header("Content-Disposition", `inline; filename="${anexo.nome}"`)
      .contentType(anexo.mimeType)
      .status(200),
  );
});
