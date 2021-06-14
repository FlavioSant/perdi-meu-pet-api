import { body, params } from "@ev-fns/validation";
import { Router } from "express";
import {
  booksDeleteOne,
  booksGetMany,
  booksGetOne,
  booksPatchOne,
  booksPostOne,
} from "../endpoints/books";
import { auth } from "../middlewares/auth";
import {
  booksGetOneParams,
  booksPatchOneBody,
  booksPostOneBody,
} from "../validations/books";

const router = Router();

/**
 * GET /books
 * @tag books
 * @response 200
 * @responseContent {book[]} 200.application/json
 * @response default
 * @responseContent {error} default.application/json
 */
router.get("/books", booksGetMany);

/**
 * POST /books
 * @tag books
 * @security bearerAuth
 * @bodyContent {booksPostRequestBody} application/json
 * @response 201
 * @responseContent {book} 201.application/json
 * @response default
 * @responseContent {error} default.application/json
 */
router.post("/books", auth, body(booksPostOneBody), booksPostOne);

/**
 * GET /books/{bookId}
 * @tag books
 * @pathParam {integer} bookId
 * @response 200
 * @responseContent {book} 200.application/json
 * @response default
 * @responseContent {error} default.application/json
 */
router.get("/books/:bookId", params(booksGetOneParams), booksGetOne);

/**
 * PATCH /books/{bookId}
 * @tag books
 * @security bearerAuth
 * @pathParam {integer} bookId
 * @bodyContent {booksPatchRequestBody} application/json
 * @response 200
 * @responseContent {book} 200.application/json
 * @response default
 * @responseContent {error} default.application/json
 */
router.patch(
  "/books/:bookId",
  auth,
  params(booksGetOneParams),
  body(booksPatchOneBody),
  booksPatchOne,
);

/**
 * DELETE /books/{bookId}
 * @tag books
 * @security bearerAuth
 * @pathParam {integer} bookId
 * @response 204
 * @response default
 * @responseContent {error} default.application/json
 */
router.delete(
  "/books/:bookId",
  auth,
  params(booksGetOneParams),
  booksDeleteOne,
);

export default router;
