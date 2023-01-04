import { FastifyReply, FastifyRequest } from 'fastify';

import { routeOpts } from './routeOptions';
import { RegisterDto } from './types';
import { preHandler } from './hooks/preHandler';
import { registrationHandler } from './register.service';
import { HttpError } from '../errors/HttpError';

const register = {
  ...routeOpts,
  preHandler,
  handler: async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      const { body } = request;

      const savedUser = await registrationHandler(body as RegisterDto);

      reply.code(201).send({ result: savedUser ? 'User is created' : 'error' });
    } catch (error) {
      if (error instanceof HttpError)
        reply.code(error.statusCode).send({ error: error.message });

      console.error(error);
    }
  },
};

export { register };
