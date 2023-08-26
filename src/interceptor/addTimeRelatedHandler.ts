import { FastifyReply, FastifyRequest } from "fastify";

type anyValue = number | string | boolean | object

export const addTimeRelatedHandler = async (_: FastifyRequest, reply: FastifyReply, payload: { [key: string]: anyValue }) => {
    payload["requestDateUTC"] = (new Date()).toUTCString()
    payload["responseTimeMilli"] = reply.getResponseTime().toPrecision(5);
}