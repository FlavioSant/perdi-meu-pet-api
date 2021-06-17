import { Router } from "express";
import { body } from "@ev-fns/validation";
import { usuariosPostOneBody } from "../validations/usuarios";
import { usuariosPostOne } from "../endpoints/usuarios";

const router = Router();

/**
 * POST /usuarios
 * @tag Usuarios
 * @bodyContent {RequestPostUsuarioBody} application/json
 * @response 201
 * @responseContent {Usuario} 201.application/json
 * @response default
 * @responseContent {Error} default.application/json
 */
router.post("/usuarios", body(usuariosPostOneBody), usuariosPostOne);

export default router;
