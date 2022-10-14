const userSchemas = require('../../schemas/user-schemas');

const { userInformationSchema, userNotFoundSchema } = userSchemas;

const usersGET = require('./users-get');

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

async function usersRoutes(fastify, getUserOpts, done) {
  fastify.get(
    '/users/:username',
    {
      schema: userGETSchema,
      handler: usersGET,
    },
  );
  done();
}

module.exports = usersRoutes;
