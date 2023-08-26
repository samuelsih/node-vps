import { FastifyInstance } from "fastify";
import { login, register } from "./controller";

export const authRoutes = async (app: FastifyInstance) => {
  app.post("/register", register);
  app.post("/login", login);
};
