import { Router } from "express";
import { body } from "@ev-fns/validation";
import { publicacoesPostBody } from "../validations/publicacoes";
import { publicacoesPost } from "../endpoints/publicacoes";
import { jwt } from "../middlewares/jwt";

const router = Router();

/**
 * POST /publicacoes
 * @tag Publicacao
 * @security BearerAuth
 * @bodyContent {PublicacaoRequestPostBody} application/json
 * @response 201
 * @responseContent {PublicacaoResponsePostBody} 201.application/json
 * @response default
 * @responseContent {Error} default.application/json
 */
router.post("/publicacoes", jwt, body(publicacoesPostBody), publicacoesPost);

export default router;
