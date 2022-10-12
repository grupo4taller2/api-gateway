const axios = require('axios');
const settings = require('../conf/config');

const userGETSchema = {
  description: 'Endpoint for fetching users',
  params: {
    userID: { type: 'string', default: 'username/email'},
  },
  tags: ['users'],
  response: {
    200: {
      description: 'Success Response',
      type: 'object',
      properties: {
        username: { type: 'string', default: 'cool_username' },
        email: { type: 'string', default: 'service@domain.com' },
        first_name: { type: 'string', default: 'fname' },
        last_name: { type: 'string', default: 'lname' },
        rider_information: {
          type: 'object',
          properties: {
            phone_number: { type: 'string', default: '+541155555555' },
            wallet: { type: 'string', default: 'as4d65a4s654aeeg54a6s5d4' },
            preferred_location_name: { type: 'string', default: 'Av. Paseo Colón 850' },    
          },
        },
        driver_information: {
          type: 'object',
          properties: {
            phone_number: { type: 'string', default: '+541155555555' },
            wallet: { type: 'string', default: 'as4d65a4s654aeeg54a6s5d4' },
            preferred_location_name: { type: 'string', default: 'Av. Paseo Colón 850' },
            car: {
              type: 'object',
              properties: {
                plate: { type: 'string', default: 'AAA 123' },
                manufacturer: { type: 'string', default: 'Audi' },
                model: { type: 'string', default: 'TT' },
                year_of_production: { type: 'integer', default: 2022 },
                color: { type: 'string', default: 'Black' },
              }
            }
          },
        },
      },
    },
  },
};

async function usersGET(req, reply) {
    // FIXME: Not yet implemented
    // Get a users para email, name, ...
    // Get a riders para ver si tiene rider data
    // Get a drivers para ver si tiene driver data.
    const userResponse = await axios.get(`${settings.SERVICE_USERS_URL}/users/${req.params.userID}`);
    // Con el username  conseguido de la response:
    const riderResponse = await axios.get(`${settings.SERVICE_USERS_URL}/riders/${userResponse.data.username}`);
    //const riderRegistration = await axios.get(`${settings.SERVICE_USERS_URL}/riders`, req.body);
    return reply.status(200).send(userResponse.data);
  }

async function usersRoutes(fastify, getUserOpts, done) {
  fastify.get(
    '/users/:userID',
    {
      schema: userGETSchema,
      handler: usersGET,
    },
  );
  done();
}

module.exports = usersRoutes;
