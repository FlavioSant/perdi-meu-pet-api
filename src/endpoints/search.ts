import { endpoint } from "@ev-fns/endpoint";
import { parsePublicacao } from "../functions/parsePublicacao";
import { Publicacao } from "../models/Publicacao";

const RADIUS = 10 / 6371;

export const searchPost = endpoint(async (req, res) => {
  const { latitude, longitude } = req.body;

  const publicacoes = await Publicacao.find({
    localizacao: {
      $geoWithin: {
        $center: [[longitude, latitude], RADIUS],
      },
    },
  }).populate("usuarioId");

  res
    .status(200)
    .json(
      publicacoes.map((publicacao) =>
        parsePublicacao(
          { _id: publicacao._id, ...(publicacao as any)._doc },
          (publicacao as any)._doc.usuarioId,
        ),
      ),
    );
});
