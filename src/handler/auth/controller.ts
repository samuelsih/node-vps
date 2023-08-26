import { FastifyReply, FastifyRequest } from 'fastify';
import { LoginRequest, RegisterRequest } from './request';
import { createUser, findUser } from './repo';

export const register = async (r: FastifyRequest, w: FastifyReply) => {
  const body = await RegisterRequest.parseAsync(r.body);
  const result = await createUser(body);
  return w.code(201).send(result);
};

export const login = async (r: FastifyRequest, w: FastifyReply) => {
  const body = await LoginRequest.parseAsync(r.body);
  const user = await findUser(body);
  if (!user || user.length === 0) {
    return w.code(400).send({ msg: 'Invalid credentials' });
  }

  const token = r.server.jwt.sign({ payload: user });
  return w.code(200).send({ token });
};

export const whoami = async (r: FastifyRequest, w: FastifyReply) => {
  const user = r.user;
  return w.code(200).send({ user });
};
