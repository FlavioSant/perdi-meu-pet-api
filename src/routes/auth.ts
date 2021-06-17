import { Router } from "express";
import { body } from "@ev-fns/validation";
import { authSignInPostBody } from "../validations/auth";
import { authSingInPost } from "../endpoints/auth";

const router = Router();

/**
 * POST /sign-in
 * @tag Auth
 * @bodyContent {RequestPostSignInBody} application/json
 * @response 200
 * @responseContent {ResponsePostSignInBody} 200.application/json
 * @response default
 * @responseContent {Error} default.application/json
 */
router.post("/sign-in", body(authSignInPostBody), authSingInPost);

export default router;
