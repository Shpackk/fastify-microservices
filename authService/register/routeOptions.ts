import { HTTPMethods } from 'fastify/types/utils';

const bodyJsonSchema = {
  type: 'object',
  required: ['firstName', 'lastName', 'address', 'phoneNumber', 'password'],
  properties: {
    firstName: {
      type: 'string',
      minLength: 1,
      maxLength: 10,
    },
    lastName: {
      type: 'string',
      minLength: 1,
      maxLength: 10,
    },
    address: {
      type: 'string',
      minLength: 10,
      maxLength: 30,
    },
    phoneNumber: {
      type: 'string',
      minLength: 10,
      maxLength: 20,
      nullable: false,
    },
    password: {
      type: 'string',
      minLength: 10,
      maxLength: 20,
    },
    accountType: {
      type: 'string',
      enum: ['business', 'default'],
    },
  },
};

export const routeOpts = {
  method: 'POST' as HTTPMethods,
  url: '/register',
  schema: {
    body: bodyJsonSchema,
    response: {
      201: {
        type: 'object',
        properties: {
          result: { type: 'string' },
        },
      },
    },
  },
};
