import { Router } from "express";
import { body, params } from "@ev-fns/validation";
import {
  publicacoesGetParams,
  publicacoesPatchBody,
  publicacoesPostBody,
} from "../validations/publicacoes";
import {
  minhasPublicacoes,
  publicacoesDelete,
  publicacoesGetOne,
  publicacoesPatch,
  publicacoesPost,
} from "../endpoints/publicacoes";
import { jwt } from "../middlewares/jwt";

const router = Router();

/**
 * GET /publicacoes/{_id}
 * @tag Publicacao
 * @security BearerAuth
 * @pathParam {string} _id
 * @response 200
 * @responseContent {Publicacao} 200.application/json
 * @response default
 * @responseContent {Error} default.application/json
 */
router.get(
  "/publicacoes/:_id",
  jwt,
  params(publicacoesGetParams),
  publicacoesGetOne,
);

/**
 * GET /minhas-publicacoes
 * @tag Publicacao
 * @security BearerAuth
 * @response 200
 * @responseContent {Publicacao} 200.application/json
 * @resopnse default
 * @responseContent {Error} default.application/json
 */
router.get("/minhas-publicacoes", jwt, minhasPublicacoes);

/**
 * POST /publicacoes
 * @tag Publicacao
 * @security BearerAuth
 * @bodyContent {PublicacaoRequestPostBody} application/json
 * @response 201
 * @responseContent {Publicacao} 201.application/json
 * @response default
 * @responseContent {Error} default.application/json
 */
router.post("/publicacoes", jwt, body(publicacoesPostBody), publicacoesPost);

/**
 * PATCH /publicacoes/{_id}
 * @tag Publicacao
 * @security BearerAuth
 * @pathParam {string} _id
 * @bodyContent {PublicacaoRequestPatchBody} application/json
 * @response 201
 * @responseContent {Publicacao} 201.application/json
 * @response default
 * @responseContent {Error} default.application/json
 */
router.patch(
  "/publicacoes/:_id",
  jwt,
  params(publicacoesGetParams),
  body(publicacoesPatchBody),
  publicacoesPatch,
);

/**
 * DELETE /publicacoes/{_id}
 * @tag Publicacao
 * @security BearerAuth
 * @pathParam {string} _id
 * @response 204
 * @response default
 * @responseContent {Error} default.application/json
 */
router.delete(
  "/publicacoes/:_id",
  jwt,
  params(publicacoesGetParams),
  publicacoesDelete,
);

export default router;
