import fastify from 'fastify';

import { login } from './login/login.controller';
import { register } from './register/register.controller';

const server = fastify();

server.route(register);
server.route(login);

server.listen({ port: 8080 }, async (err, adress) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running on ${adress}`);
});
