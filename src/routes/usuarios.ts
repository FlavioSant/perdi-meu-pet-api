import { Router } from "express";
import { body } from "@ev-fns/validation";
import {
  usuariosPostOneBody,
  usuariosResetPasswordPostBody,
} from "../validations/usuarios";
import {
  usuariosPostOne,
  usuariosResetPasswordPost,
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
 * POST /reset-password
 * @tag Usuarios
 * @bodyContent {RequestPostResetPasswordBody} application/json
 * @response 200
 * @responseContent {Usuario} 200.application/json
 * @response default
 * @responseContent {Error} default.application/json
 */
router.post(
  "/reset-password",
  body(usuariosResetPasswordPostBody),
  usuariosResetPasswordPost,
);

export default router;
