import { IncomingMessage, ServerResponse } from 'http';

export const handleGetTest = (
  request: IncomingMessage,
  response: ServerResponse,
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

export const notFoundRoute = (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  response.statusCode = 404;
  response.write(JSON.stringify({ error: 'Page Not Found' }));
  response.end();
};
