import { FastifyReply, FastifyRequest } from "fastify";

export const preventEmptyReqBody = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  if (["GET", "DELETE"].includes(request.method)) {
    return;
  }

  if (request.body === null || request.body === undefined) {
    return reply.code(400).send({
      msg: "Please provide all required request",
    });
  }
};
