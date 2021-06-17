import { Router } from "express";
import { body } from "@ev-fns/validation";
import { authSignUpPostBody, authSignInPostBody } from "../validations/auth";
import { authSingUpPost, authSingInPost } from "../endpoints/auth";

const router = Router();

/**
 * POST /sign-up
 * @tag Auth
 * @bodyContent {SignUpRequestPostBody} application/json
 * @response 201
 * @responseContent {SignUpResponsePostBody} 201.application/json
 * @response default
 * @responseContent {Error} default.application/json
 */
router.post("/sign-up", body(authSignUpPostBody), authSingUpPost);

/**
 * POST /sign-in
 * @tag Auth
 * @bodyContent {SignInRequestPostBody} application/json
 * @response 200
 * @responseContent {SignInResponsePostBody} 200.application/json
 * @response default
 * @responseContent {Error} default.application/json
 */
router.post("/sign-in", body(authSignInPostBody), authSingInPost);

export default router;
