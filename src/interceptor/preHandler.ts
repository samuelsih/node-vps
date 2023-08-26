import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";

export const preventEmptyReqBody = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction,
) => {
  if (["GET", "DELETE"].includes(request.method)) {
    done();
  }

  if (request.body === null || request.body === undefined) {
    return reply.code(400).send({
      msg: "Please provide all required request",
    });
  }

  done();
};
