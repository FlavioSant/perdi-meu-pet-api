import { Router } from "express";
import { body } from "@ev-fns/validation";
import {
  usuariosPostOneBody,
  usuariosVerificarUsuarioPostBody,
} from "../validations/usuarios";
import {
  usuariosPostOne,
  usuariosVerificarUsuarioPost,
} from "../endpoints/usuarios";

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

/**
 * POST /verificar-usuario
 * @tag Usuarios
 * @bodyContent {RequestPostVerificarUsuarioBody} application/json
 * @response 200
 * @responseContent {Usuario} 200.application/json
 * @response default
 * @responseContent {Error} default.application/json
 */
router.post(
  "/verificar-usuario",
  body(usuariosVerificarUsuarioPostBody),
  usuariosVerificarUsuarioPost,
);

export default router;
