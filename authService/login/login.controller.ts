import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpError } from '../errors/HttpError';
import { loginHandler } from './login.service';

import { routeOpts } from './routeOptions';
import { LoginDto } from './types';

const login = {
  ...routeOpts,
  handler: async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      const { body } = request;

      const userFromDb = await loginHandler(body as LoginDto);

      return reply
        .code(200)
        .send({ result: `${userFromDb.firstName} Logged in` });
    } catch (error) {
      if (error instanceof HttpError) {
        reply.code(error.statusCode).send({ error: error.message });
      }
      console.log(error);
    }
  },
};

export { login };
