const userSchemas = require('../../schemas/user-schemas');

const { userInformationSchema, userNotFoundSchema } = userSchemas;

const usersGET = require('./users-get-by-username');
const usersSearch = require('./users-search');

const userGETSchema = {
  description: 'Fetch user by username',
  params: {
    username: {
      type: 'string',
      default: 'username',
    },
  },
  tags: ['users'],
  response: {
    200: {
      description: 'Success Response',
      type: 'object',
      properties: userInformationSchema,
    },
    404: {
      description: 'User not found',
      type: 'object',
      properties: userNotFoundSchema,
    },
  },
};

const userSearchSchema = {
  description: 'Search users by username',
  tags: ['users'],
  querystring: {
    like: { type: 'string', description: 'substring of username' },
    email: { type: 'string', description: 'user email' },
  },
  response: {
    200: {
      description: 'Successful Response',
      type: 'array',
      items: { type: 'object', properties: userInformationSchema },
    },
  },
};

async function usersRoutes(fastify, getUserOpts, done) {
  fastify.get(
    '/users/:username',
    {
      schema: userGETSchema,
      handler: usersGET,
    },
  );
  fastify.get(
    '/users/search',
    {
      onRequest: [fastify.verify],
      schema: userSearchSchema,
      handler: usersSearch,
    },
  );
  done();
}

module.exports = usersRoutes;
