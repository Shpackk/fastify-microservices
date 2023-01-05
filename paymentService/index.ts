import http from 'node:http';

import { controllers } from './controllers';
import { GlobalRouter } from './router';

const PORT = process.env.PORT || 3000;

const server = http.createServer();
const Router = new GlobalRouter(controllers);

server.listen(PORT, () => console.log('Listening on ' + PORT));

server.on('request', (request, response) => {
  const { method, url } = request;

  Router.getController(`${method}${url}`)(request, response);
});
