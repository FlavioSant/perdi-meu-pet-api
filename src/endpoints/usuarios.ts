import { endpoint } from "@ev-fns/endpoint";

export const usuariosPostOne = endpoint(async (req, res) => {
  const { email, senha, nome } = req.body;

  console.log({ email, senha, nome });

  res.status(204).end();
});

export const usuariosResetPasswordPost = endpoint(async (req, res) => {
  const { token, senha } = req.body;

  console.log({ token, senha });

  res.status(204).end();
});
