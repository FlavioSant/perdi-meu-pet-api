import "../fixture";

import { request } from "../request";

const AUTHORIZATION = { authorization: `Bearer ${process.env.API_TOKEN}` };

describe("/books", () => {
  describe("400 - Bad Request", () => {
    test("POST /books", async () => {
      expect.assertions(1);

      const res = await request().post("/books").set(AUTHORIZATION).send({});

      expect(res.status).toBe(400);
    });

    test("GET /books/:bookId", async () => {
      expect.assertions(1);

      const res = await request().get("/books/invalid");

      expect(res.status).toBe(400);
    });

    test("PATCH /books/:bookId", async () => {
      expect.assertions(2);

      const res1 = await request()
        .patch("/books/invalid")
        .set(AUTHORIZATION)
        .send({ title: "Book" });

      expect(res1.status).toBe(400);

      const res2 = await request()
        .patch("/books/invalid")
        .set(AUTHORIZATION)
        .send({});

      expect(res2.status).toBe(400);
    });

    test("DELETE /books/:bookId", async () => {
      expect.assertions(1);

      const res = await request().delete("/books/invalid").set(AUTHORIZATION);

      expect(res.status).toBe(400);
    });
  });

  describe("401 - Unauthorized", () => {
    test("POST /books", async () => {
      expect.assertions(1);

      const response = await request()
        .post("/books")
        .send({ title: "book1", author: "author1" });

      expect(response.status).toEqual(401);
    });

    test("PATCH /books/:bookId", async () => {
      expect.assertions(1);

      const response = await request()
        .patch("/books/1")
        .send({ title: "book1" });

      expect(response.status).toEqual(401);
    });

    test("DELETE /books/:bookId", async () => {
      expect.assertions(1);

      const response = await request().delete("/books/1");

      expect(response.status).toEqual(401);
    });
  });

  describe("404 - Not Found", () => {
    test("GET /books/:bookId", async () => {
      expect.assertions(1);

      const res = await request().get("/books/9999");

      expect(res.status).toBe(404);
    });

    test("PATCH /books/:bookId", async () => {
      expect.assertions(1);

      const res = await request()
        .patch("/books/9999")
        .set(AUTHORIZATION)
        .send({ title: "title1" });

      expect(res.status).toBe(404);
    });

    test("DELETE /books/:bookId", async () => {
      expect.assertions(1);

      const res = await request().delete("/books/9999").set(AUTHORIZATION);

      expect(res.status).toBe(404);
    });
  });

  describe("200 - OK", () => {
    test("GET /books", async () => {
      expect.assertions(2);

      const response = await request().get("/books");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    test("GET /books/:bookId", async () => {
      expect.assertions(3);

      const res1 = await request()
        .post("/books")
        .set(AUTHORIZATION)
        .send({ title: "title1", author: "author1" });

      expect(res1.status).toBe(201);

      const res2 = await request().get(`/books/${res1.body.bookId}`);

      expect(res2.status).toBe(200);

      expect(res1.body).toEqual(res2.body);
    });

    test("PATCH /books/:bookId", async () => {
      expect.assertions(6);

      const res1 = await request()
        .post("/books")
        .set(AUTHORIZATION)
        .send({ title: "title1", author: "author1" });

      expect(res1.status).toBe(201);

      const res2 = await request().get(`/books/${res1.body.bookId}`);

      expect(res2.status).toBe(200);

      expect(res1.body).toEqual(res2.body);

      const res3 = await request()
        .patch(`/books/${res1.body.bookId}`)
        .set(AUTHORIZATION)
        .send({ title: "title2" });

      expect(res3.status).toBe(200);

      expect(res3.body).not.toEqual(res2.body);
      expect(res3.body).toEqual({ ...res2.body, title: "title2" });
    });
  });

  describe("201 - Created", () => {
    test("POST /books", async () => {
      expect.assertions(3);

      const res1 = await request()
        .post("/books")
        .set(AUTHORIZATION)
        .send({ title: "title1", author: "author1" });

      expect(res1.status).toBe(201);

      const res2 = await request().get(`/books/${res1.body.bookId}`);

      expect(res2.status).toBe(200);

      expect(res1.body).toEqual(res2.body);
    });
  });

  describe("204 - No Body", () => {
    test("DELETE /books/:bookId", async () => {
      expect.assertions(5);

      const res1 = await request()
        .post("/books")
        .set(AUTHORIZATION)
        .send({ title: "title1", author: "author1" });

      expect(res1.status).toBe(201);

      const res2 = await request().get(`/books/${res1.body.bookId}`);

      expect(res2.status).toBe(200);

      expect(res1.body).toEqual(res2.body);

      const res3 = await request()
        .delete(`/books/${res1.body.bookId}`)
        .set(AUTHORIZATION);

      expect(res3.status).toBe(204);

      const res4 = await request().get(`/books/${res1.body.bookId}`);

      expect(res4.status).toBe(404);
    });
  });
});
