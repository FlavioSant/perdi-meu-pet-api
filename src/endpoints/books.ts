import { endpoint } from "@ev-fns/endpoint";
import { HttpError } from "@ev-fns/errors";

const books: Record<string, any>[] = [];
const id = (() => {
  let _id = 0;
  return () => ++_id;
})();

export const booksGetMany = endpoint(async (req, res) => {
  res.status(200).json(books);
});

export const booksPostOne = endpoint(async (req, res) => {
  const book = { bookId: id(), ...req.body };

  books.push(book);

  res.status(201).json(book);
});

export const booksGetOne = endpoint(async (req, res) => {
  const { bookId } = req.params;

  const index = books.findIndex((x) => x.bookId === bookId);
  if (index === -1) {
    throw new HttpError(404, "Not found");
  }

  const book = books[index];

  res.status(200).json(book);
});

export const booksPatchOne = endpoint(async (req, res) => {
  const { bookId } = req.params;

  const index = books.findIndex((x) => x.bookId === bookId);
  if (index === -1) {
    throw new HttpError(404, "Not found");
  }

  const book = { ...books[index], ...req.body };

  res.status(200).json(book);
});

export const booksDeleteOne = endpoint(async (req, res) => {
  const { bookId } = req.params;

  const index = books.findIndex((x) => x.bookId === bookId);
  if (index === -1) {
    throw new HttpError(404, "Not found");
  }

  books.splice(index, 1);

  res.status(204).end();
});
