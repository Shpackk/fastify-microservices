import fastify from 'fastify';

const server = fastify();

server.get('/ping', async (request, reply) => {
  console.log(request);
  reply.send({
    success: true,
  });
});

server.listen({ port: 8080 }, (err, adress) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running on ${adress}`);
});
