const axios = require('axios');
const settings = require('../conf/config');

const riderPOSTSchema = {
  description: 'Endpoint for creating rider',
  tags: ['riders'],
  body: {
    description: 'Payload for creating a new rider',
    type: 'object',
    properties: {
      username: { type: 'string', default: 'unique_username' },
      email: { type: 'string', default: 'service@domain.com' },
      first_name: { type: 'string', default: 'fname' },
      last_name: { type: 'string', default: 'lname' },
      phone_number: { type: 'string', default: '+541155555555' },
      wallet: { type: 'string', default: 'as4d65a4s654aeeg54a6s5d4' },
      preferred_location_name: { type: 'string', default: 'Av. Paseo Colón 850' },
    },
  },
  response: {
    201: {
      description: 'Success Response',
      type: 'object',
      properties: {
        username: { type: 'string', default: 'unique_username' },
        email: { type: 'string', default: 'service@domain.com' },
        first_name: { type: 'string', default: 'fname' },
        last_name: { type: 'string', default: 'lname' },
        phone_number: { type: 'string', default: '+541155555555' },
        wallet: { type: 'string', default: 'as4d65a4s654aeeg54a6s5d4' },
        preferred_location_name: { type: 'string', default: 'Av. Paseo Colón 850' },
      },
    },
  },
};

const riderPATCHchema = {
  description: 'Endpoint for updating rider info',
  params: {
    email: {
      type: 'string',
      default: 'email',
    },
  },
  tags: ['riders'],
  body: {
    description: 'Payload for updating an existing rider',
    type: 'object',
    properties: {
      first_name: { type: 'string', default: 'fname' },
      last_name: { type: 'string', default: 'lname' },
      phone_number: { type: 'string', default: '+541155555555' },
      wallet: { type: 'string', default: 'as4d65a4s654aeeg54a6s5d4' },
      preferred_location_name: { type: 'string', default: 'Av. Paseo Colón 850' },
    },
  },
  response: {
    202: {
      description: 'Success Response',
      type: 'object',
      properties: {
        username: { type: 'string', default: 'unique_username' },
        email: { type: 'string', default: 'service@domain.com' },
        first_name: { type: 'string', default: 'fname' },
        last_name: { type: 'string', default: 'lname' },
        phone_number: { type: 'string', default: '+541155555555' },
        wallet: { type: 'string', default: 'as4d65a4s654aeeg54a6s5d4' },
        preferred_location_name: { type: 'string', default: 'Av. Paseo Colón 850' },
      },
    },
  },
};

async function ridersPOST(req, reply) {
  // FIXME: DO NOT HARDCODE 201
  req.body.preferred_location_latitude = -32.4;
  req.body.preferred_location_longitude = -33.4;
  let riderRegistrationResponse;
  try {
    riderRegistrationResponse = await axios.post(`${settings.serviceUsersURL()}/riders`, req.body);
  } catch (error) {
    if (!error.response || error.response.status >= 500) {
      return reply.status(503).send(
        {
          msg: 'Servicio no disponible',
        },
      );
    }
  }
  return reply.status(201).send(riderRegistrationResponse.data);
}

async function ridersPATCH(req, reply) {
  req.body.preferred_location_latitude = -32.4;
  req.body.preferred_location_longitude = -33.4;
  const riderUpdate = await axios.patch(`${settings.serviceUsersURL()}/riders/${req.params.email}/status`, req.body);
  return reply.status(202).send(riderUpdate.data);
}

async function ridersRoutes(fastify, getUserOpts, done) {
  fastify.post(
    '/riders',
    {
      onRequest:[fastify.verify],
      schema: riderPOSTSchema,
      handler: ridersPOST,
    },
  );
  fastify.patch(
    '/riders/:email/status',
    {
      onRequest:[fastify.verify],
      schema: riderPATCHchema,
      handler: ridersPATCH,
    },
  );
  done();
}

module.exports = ridersRoutes;
