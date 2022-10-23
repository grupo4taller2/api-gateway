const adminSchemas = require('../../schemas/admin-schemas');

const { adminSchema } = adminSchemas;

const adminCreate = require('./admin-create');
const adminGet = require('./admin-get-by-email');

const adminPOSTSchema = {
  description: 'Create new admin account',
  tags: ['admins'],
  body: {
    description: 'Payload for creating a new admin',
    type: 'object',
    properties: {
      email: { type: 'string' },
    },
  },
  response: {
    201: {
      description: 'Successful Response',
      type: 'object',
      properties: adminSchema,
    },
  },
};

const adminGETSchema = {
  description: 'Get admin by email',
  tags: ['admins'],
  params: {
    email: {
      type: 'string',
      default: 'admin@domain.com',
    },
  },
  response: {
    200: {
      description: 'Successful Response',
      type: 'object',
      properties: adminSchema,
    },
  },
};

async function adminRoutes(fastify, getUserOpts, done) {
  fastify.post(
    '/admins',
    {
      onRequest: [fastify.verify],
      schema: adminPOSTSchema,
      handler: adminCreate,
    },
  );
  fastify.get(
    '/admins/:email',
    {
      onRequest: [fastify.verify],
      schema: adminGETSchema,
      handler: adminGet,
    },
  );
  done();
}

module.exports = adminRoutes;
