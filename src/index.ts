import fastify from "fastify";
import { authRoutes } from "@/handler/auth/routes";
import errorHandler from "@/interceptor/errorHandler";
import { preventEmptyReqBody } from "@/interceptor/preHandler";
import { addTimeRelatedHandler } from "@/interceptor/addTimeRelatedHandler";

async function main() {
  const app = fastify({
    logger: true,
  });

  app.setErrorHandler(errorHandler);
  app.addHook("preHandler", preventEmptyReqBody);
  app.addHook("preSerialization", addTimeRelatedHandler)
  app.register(authRoutes, { prefix: "/auth" });

  app.get("/", (_, res) => res.code(200).send({ msg: "OK" }));

  await app.listen({
    host: "localhost",
    port: 5000,
  });

  const signals = ["SIGINT", "SIGTERM"];

  for (const signal of signals) {
    process.on(signal, () => {
      app.close();
    });
  }
}

main();
