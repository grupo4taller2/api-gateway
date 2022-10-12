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
        // FIXME: no poner resultados default para que no autocomplete
        // fastify con valores imputados
        username: { type: 'string', default: 'cool_username' },
        email: { type: 'string' },
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

    let responseData = {};

    const userResponse = await axios.get(`${settings.SERVICE_USERS_URL}/users/${req.params.userID}`);
    // FIXME: si 404 -> Return 404.
    const username = userResponse.data.username;
    responseData.username = username;
    responseData.email = userResponse.data.email
    responseData.first_name = userResponse.data.first_name;
    responseData.last_name = userResponse.data.last_name;
    const riderResponse = await axios.get(`${settings.SERVICE_USERS_URL}/riders/${username}`);
    responseData.rider_information = {}
    responseData.rider_information.phone_number = riderResponse.data.phone_number;
    responseData.rider_information.wallet = riderResponse.data.wallet;
    responseData.rider_information.preferred_location_name = riderResponse.data.preferred_location_name;
    
    //const riderRegistration = await axios.get(`${settings.SERVICE_USERS_URL}/riders`, req.body);
    
    return reply.status(200).send(responseData);
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
