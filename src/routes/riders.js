const axios = require('axios');
const settings = require('../conf/config');

const riderSchema = {
  description: 'Endpoint for creating rider',
  tags: ['riders'],
  body: {
    description: 'Payload for creating a new rider',
    type: 'object',
    properties: {
      username: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
      first_name: { type: 'string' },
      last_name: { type: 'string', default: 'a_last_name' },
      phone_number: { type: 'string' },
      wallet: { type: 'string' },
      preferred_latitude: { type: 'number' },
      preferred_longitude: { type: 'number' },
    },
  },
  response: {
    201: {
      description: 'Success Response',
      type: 'object',
      properties: {
        username: { type: 'string' },
        email: { type: 'string' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        phone_number: { type: 'string' },
        wallet: { type: 'string' },
        preferred_latitude: { type: 'number' },
        preferred_longitude: { type: 'number' },
      },
    },
  },
};

async function ridersPUT(req, reply) {
  const riderRegistration = await axios.post(`${settings.SERVICE_USERS_URL}/riders`, req.body);
  return reply.status(201).send(riderRegistration.data);
}

async function ridersRoutes(fastify, getUserOpts, done) {
  fastify.post(
    '/riders',
    {
      schema: riderSchema,
      handler: ridersPUT,
    },
  );
  done();
}

module.exports = ridersRoutes;
