import { FastifyReply, FastifyRequest } from 'fastify';

import { compare } from '../hashing';
import { findUser } from './login.service';
import { routeOpts } from './routeOptions';
import { LoginDto } from './types';

const login = {
  ...routeOpts,
  handler: async function ({ body }: FastifyRequest, reply: FastifyReply) {
    try {
      const { password, phoneNumber } = body as LoginDto;
      const user = await findUser(phoneNumber);

      if (!user) {
        return reply.code(404).send({ result: 'User not found' });
      }

      const passwordDidMatch = compare(password, user.password!);

      if (!passwordDidMatch) {
        return reply.code(403).send({ result: 'Password is incorrect' });
      }

      return reply.code(200).send({ result: 'Sucessfully logged in' });
    } catch (error) {
      console.error(error);
    }
  },
};

export { login };
