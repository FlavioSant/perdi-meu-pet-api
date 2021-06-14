import dotenv from "@ev-fns/dotenv";

dotenv({}, ({ NODE_ENV, npm_package_version }) => {
  console.info(`🌟 ${NODE_ENV}`);
  console.info(`🔖 ${npm_package_version}`);
});

import mongoose from "mongoose";
import { connect } from "@ev-fns/mongo";
import server from "@ev-fns/server";
import app from "./app";

const PORT = +process.env.PORT || 3000;

server({
  app,
  port: PORT,
  before: async () => {
    await connect(mongoose, {
      protocol: process.env.MONGODB_PROTOCOL,
      server: process.env.MONGODB_SERVER,
      port: +process.env.MONGODB_PORT,
      user: process.env.MONGODB_USER,
      pass: process.env.MONGODB_PASSWORD,
      database: process.env.MONGODB_DATABASE,
    });
  },
  after: async () => {
    console.info(`🚀 http://localhost:${PORT}`);
  },
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
