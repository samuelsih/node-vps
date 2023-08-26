import fastify from 'fastify';
import { authRoutes } from '@/handler/auth/routes';
import { errorHandler } from '@/interceptor/errorHandler';
import { preventEmptyReqBody } from '@/interceptor/preHandler';
import { addTimeRelatedHandler } from '@/interceptor/addTimeRelatedHandler';
import { fastifyJwt } from '@fastify/jwt';
import {
  checkJWTHandler,
  jwtCustomMessages,
} from '@/interceptor/checkJWTHandler';

async function main() {
  const app = fastify({
    logger: true,
  });

  app.setErrorHandler(errorHandler);
  app.addHook('onRequest', checkJWTHandler);
  app.addHook('preHandler', preventEmptyReqBody);
  app.addHook('preSerialization', addTimeRelatedHandler);

  app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'supersecretkey',
    decode: { complete: false, checkTyp: 'JWT' },
    sign: {
      expiresIn: 3600 * 24 * 7, // 7 days
    },
    verify: {
      maxAge: 3600 * 22 * 7,
      cache: true,
    },
    messages: jwtCustomMessages,
  });

  // routes
  app.register(authRoutes, { prefix: '/auth' });

  await app.listen({
    host: 'localhost',
    port: 5000,
  });

  const signals = ['SIGINT', 'SIGTERM'];

  for (const signal of signals) {
    process.on(signal, () => {
      app.close();
    });
  }
}

main();
