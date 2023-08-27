import { authRoutes } from "@/handler/auth/routes";
import { initServer } from "./server";

async function main() {
  const app = initServer();

  // routes
  app.register(authRoutes, { prefix: "/auth" });

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
