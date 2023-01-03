import { FastifyReply, FastifyRequest } from 'fastify';

import { routeOpts } from './routeOptions';
import { RegisterDto } from './types';
import { saveUser } from './register.service';
import { preHandler } from './hooks/preHandler';

const register = {
  ...routeOpts,
  preHandler,
  handler: async function ({ body }: FastifyRequest, reply: FastifyReply) {
    try {
      const savedUser = await saveUser(body as RegisterDto);
      reply.code(201).send(savedUser ? 'User is created' : 'error');
    } catch (error) {
      console.error(error);
    }
  },
};

export { register };
