import { FastifyReply, FastifyRequest } from "fastify";
import { LoginRequest, RegisterRequest } from "./request";
import { IAuthRepo } from "./types";

export const register = (repo: IAuthRepo) => {
  return async (r: FastifyRequest, w: FastifyReply) => {
    const body = await RegisterRequest.parseAsync(r.body);
    const result = await repo.createUser(body);
    return w.code(201).send(result);
  };
};

export const login = (repo: IAuthRepo) => {
  return async (r: FastifyRequest, w: FastifyReply) => {
    const body = await LoginRequest.parseAsync(r.body);
    const user = await repo.findUser(body);
    if (!user) {
      return w.code(400).send({ msg: "Invalid credentials" });
    }

    const token = r.server.jwt.sign({ payload: user });
    return w.code(200).send({ token });
  };
};

export const whoami = () => {
  return async (r: FastifyRequest, w: FastifyReply) => {
    const user = r.user;
    return w.code(200).send({ user });
  };
};
