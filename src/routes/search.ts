import { Router } from "express";
import { body } from "@ev-fns/validation";
import { searchPostBody } from "../validations/search";
import { searchPost } from "../endpoints/search";
import { jwt } from "../middlewares/jwt";

const router = Router();

/**
 * POST /search
 * @tag Search
 * @security BearerAuth
 * @bodyContent {SearchRequestPostBody} application/json
 * @response 200
 * @responseContent {SearchResponsePostBody} 200.application/json
 * @response default
 * @responseContent {Error} default.application/json
 */
router.post("/search", jwt, body(searchPostBody), searchPost);

export default router;
