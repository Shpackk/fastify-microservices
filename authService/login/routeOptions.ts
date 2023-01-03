import { HTTPMethods } from 'fastify/types/utils';

const bodyJsonSchema = {
  type: 'object',
  required: ['password', 'phoneNumber'],
  properties: {
    phoneNumber: {
      type: 'string',
      minLength: 10,
      maxLength: 20,
    },
    password: {
      type: 'string',
      minLength: 10,
      maxLength: 20,
    },
  },
};

export const routeOpts = {
  method: 'POST' as HTTPMethods,
  url: '/login',
  schema: {
    body: bodyJsonSchema,
    response: {
      200: {
        type: 'object',
        properties: {
          result: { type: 'string' },
        },
      },
    },
  },
};
