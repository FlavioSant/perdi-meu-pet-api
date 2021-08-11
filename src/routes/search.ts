import { Router } from "express";
import { body } from "@ev-fns/validation";
import { searchFilterPostBody, searchPostBody } from "../validations/search";
import { searchFilterPost, searchPost } from "../endpoints/search";
import { jwt } from "../middlewares/jwt";

const router = Router();

/**
 * POST /search
 * @tag Search
 * @bodyContent {SearchRequestPostBody} application/json
 * @response 200
 * @responseContent {Publicacao[]} 200.application/json
 * @response default
 * @responseContent {Error} default.application/json
 */
router.post("/search", body(searchPostBody), searchPost);

/**
 * POST /search-filter
 * @tag Search
 * @security BearerAuth
 * @bodyContent {SearchFilterRequestPostBody} application/json
 * @response 200
 * @responseContent {Publicacao[]} 200.application/json
 * @response default
 * @responseContent {Error} default.application/json
 */
router.post(
  "/search-filter",
  jwt,
  body(searchFilterPostBody),
  searchFilterPost,
);

export default router;
