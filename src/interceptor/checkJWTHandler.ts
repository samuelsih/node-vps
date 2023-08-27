import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

type JWTData = {
  payload: AuthenticatedUser[];
  iat: number;
  exp: number;
};

type AuthenticatedUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
};

export const checkJWTHandler = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const skipURL = ["/auth/register", "/auth/login"];

  if (skipURL.includes(request.url)) {
    return;
  }

  try {
    const decoded = (await request.jwtVerify()) as JWTData;
    request.user = decoded.payload[0];
  } catch (error) {
    const { statusCode, message } = error as FastifyError;
    return reply.code(Number(statusCode)).send({ msg: message });
  }
};

export const jwtCustomMessages = {
  badRequestErrorMessage: "Invalid credentials",
  noAuthorizationInHeaderMessage: "Unauthorized",
  noAuthorizationInCookieMessage: "Unauthorized",
  authorizationTokenExpiredMessage: "Session has expired. Please re-login.",
  authorizationTokenUntrusted: "Bad request",
  authorizationTokenUnsigned: "Bad request",
  authorizationTokenInvalid: "Invalid user",
};
