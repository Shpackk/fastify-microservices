import http from 'node:http';

const PORT = process.env.PORT || 3000;

const server = http.createServer();

const handleGetTest = (
  request: http.IncomingMessage,
  response: http.ServerResponse,
) => {
  response.statusCode = 200;
  const responseBody = JSON.stringify({
    result: 'data sent',
  });
  response.write(responseBody, () => {
    console.log('data sent');
  });
  response.end();
};

const notFoundRoute = (
  request: http.IncomingMessage,
  response: http.ServerResponse,
) => {
  response.statusCode = 404;
  response.write(JSON.stringify({ error: 'Page Not Found' }));
  response.end();
};

type ControllersHub = {
  [key: string]: (req: http.IncomingMessage, res: http.ServerResponse) => void;
};

const router: ControllersHub = {
  notFound: notFoundRoute,
  'GET/test': handleGetTest,
};

server.listen(PORT, () => console.log('Listening on ' + PORT));

server.on('request', (request, response) => {
  const controller =
    request.url && request.method
      ? `${request.method}${request.url}`
      : 'notFound';

  const isRoutePresent = Boolean(router[controller]);

  const callableController = isRoutePresent
    ? router[controller]
    : router['notFound'];

  callableController(request, response);
});
