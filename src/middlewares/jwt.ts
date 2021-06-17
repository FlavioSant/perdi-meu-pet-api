import { jwt as createJwt } from "@ev-fns/jwt";

export const jwt = createJwt({ secret: process.env.JWT_SECRET });
