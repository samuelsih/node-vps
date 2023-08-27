import fastify, { FastifyInstance } from "fastify";
import {
  checkJWTHandler,
  jwtCustomMessages,
} from "@/interceptor/checkJWTHandler";
import { errorHandler } from "@/interceptor/errorHandler";
import { preventEmptyReqBody } from "@/interceptor/preHandler";
import { addTimeRelatedHandler } from "@/interceptor/addTimeRelatedHandler";
import fastifyJwt from "@fastify/jwt";

export const initServer = (): FastifyInstance => {
  const app = fastify({
    logger: true,
    disableRequestLogging: true,
  });

  app.setErrorHandler(errorHandler);

  app.addHook("onRequest", checkJWTHandler);
  app.addHook("preHandler", preventEmptyReqBody);
  app.addHook("preSerialization", addTimeRelatedHandler);

  app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || "supersecretkey",
    decode: { complete: false, checkTyp: "JWT" },
    sign: {
      expiresIn: 3600 * 24 * 7, // 7 days
    },
    verify: {
      maxAge: 3600 * 22 * 7,
      cache: true,
    },
    messages: jwtCustomMessages,
  });

  return app;
};
