import { endpoint } from "@ev-fns/endpoint";

export const searchPost = endpoint(async (req, res) => {
  res.status(204).end();
});
