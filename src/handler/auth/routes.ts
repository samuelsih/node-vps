import { FastifyInstance } from "fastify";
import { login, register, whoami } from "./controller";
import AuthRepo from "./repo";
import { db } from "@/db";

export const authRoutes = async (app: FastifyInstance) => {
  const repo = new AuthRepo(db)
  
  app.post("/register", register(repo));
  app.post("/login", login(repo));
  app.get("/me", whoami());
};
