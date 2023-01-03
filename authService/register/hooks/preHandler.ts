import { DoneFuncWithErrOrRes, FastifyReply, FastifyRequest } from 'fastify';
import { hash } from '../../hashing';
import { RegisterDto } from '../types';

export const preHandler = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: DoneFuncWithErrOrRes,
) => {
  const body = request.body as RegisterDto;
  const { password } = body;
  body.password = hash(password);
  done();
};
