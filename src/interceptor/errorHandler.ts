import { FastifyError, FastifyRequest, FastifyReply } from "fastify";
import { ZodError } from "zod";

export const errorHandler = (
  errors: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  if (errors instanceof ZodError) {
    return reply.code(400).send({
      msg: "Failed validation",
      errors: customizeZodError(errors),
    });
  }

  if (errors instanceof SyntaxError) {
    return reply.code(400).send({
      msg: errors.message,
    });
  }

  if (errors.code === "23505") {
    return reply.code(400).send({
      msg: "Failed registration",
      errors: {
        email: "Email is already taken.",
      },
    });
  }

  request.log.error(errors);

  return reply
    .code(500)
    .send({ msg: "Internal server error. Please try again later." });
};

const customizeZodError = (errors: ZodError) => {
  const issues = errors.issues;

  const errs: { [key: string]: string } = {};

  console.log(issues);

  issues.forEach(({ path, message }) => {
    const key = path[0];
    errs[key] = message;
  });

  return errs;
};
