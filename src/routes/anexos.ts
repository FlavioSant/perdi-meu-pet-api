import { params } from "@ev-fns/validation";
import { Router } from "express";
import { anexosGetOne, anexosPostOne } from "../endpoints/anexos";
import { jwt } from "../middlewares/jwt";
import { upload } from "../middlewares/upload";
import { anexosGetOneParams } from "../validations/anexos";

const router = Router();

/**
 * POST /anexos
 * @tag Anexos
 * @security BearerAuth
 * @bodyContent {AnexoPostBody} multipart/form-data
 * @response 201
 * @responseContent {Anexo} 201.application/json
 * @response default
 * @responseContent {Error} default.application/json
 */
router.post("/anexos", jwt, upload, anexosPostOne);

/**
 * GET /anexos/{anexoId}
 * @tag Anexos
 * @pathParam {string} anexoId
 * @response 200
 * @response default
 * @responseContent {Error} default.application/json
 */
router.get("/anexos/:anexoId", params(anexosGetOneParams), anexosGetOne);

export default router;
