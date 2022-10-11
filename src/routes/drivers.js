const axios = require('axios');
const settings = require('../conf/config');

const driverSchema = {
  description: 'Endpoint for creating drivers',
  tags: ['drivers'],
  body: {
    description: 'Payload for creating a new driver',
    type: 'object',
    properties: {
      username: { type: 'string', default: 'unique_username' },
      email: { type: 'string', default: 'service@drivers.com' },
      password: { type: 'string', default: 'secury' },
      first_name: { type: 'string', default: 'fname' },
      last_name: { type: 'string', default: 'lname' },
      phone_number: { type: 'string', default: '+541155555555' },
      wallet: { type: 'string', default: 'as4d65a4s654aeeg54a6s5d4' },
      preferred_location: { type: 'string', default: 'Av. Paseo Colón 850' },
      car_manufacturer: { type: 'string', default: 'Audi' },
      car_model: { type: 'string', default: 'TT' },
      car_year_of_production: { type: 'integer', default: 2022 },
      car_color: { type: 'string', default: 'Abyss Blue' },
      car_plate: { type: 'string', default: 'AAA 123' },
    },
  },
  response: {
    201: {
      description: 'Success Response',
      type: 'object',
      properties: {
        username: { type: 'string', default: 'unique_username' },
        first_name: { type: 'string', default: 'fname' },
        last_name: { type: 'string', default: 'lname' },
        email: { type: 'string', default: 'service@drivers.com' },
        wallet: { type: 'string', default: 'as4d65a4s654aeeg54a6s5d4' },
        phone_number: { type: 'string', default: '+541155555555' },
        preferred_location: { type: 'string', default: 'Av. Paseo Colón 850' },
        car_manufacturer: { type: 'string', default: 'Audi' },
        car_model: { type: 'string', default: 'TT' },
        car_year_of_production: { type: 'integer', default: 2022 },
        car_color: { type: 'string', default: 'Abyss Blue' },
        car_plate: { type: 'string', default: 'AAA 123' },
      },
    },
  },
};

async function driversPOST(req, reply) {
  req.body.preferred_latitude = -32.4;
  req.body.preferred_longitude = -33.4;
  const riderRegistration = await axios.post(`${settings.SERVICE_USERS_URL}/drivers`, req.body);
  // FIXME: DO NOT HARDCODE 201
  return reply.status(201).send(riderRegistration.data);
}

async function driversRoutes(fastify, getUserOpts, done) {
  fastify.post(
    '/drivers',
    {
      schema: driverSchema,
      handler: driversPOST,
    },
  );
  done();
}

module.exports = driversRoutes;
