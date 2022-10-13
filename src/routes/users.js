const axios = require('axios');
const settings = require('../conf/config');

const userGETSchema = {
  description: 'Endpoint for fetching users',
  params: {
    userID: {
      type: 'string',
      default: 'username/email'
    },
  },
  tags: ['users'],
  response: {
    200: {
      description: 'Success Response',
      type: 'object',
      properties: {
        // FIXME: no poner resultados default para que no autocomplete
        // fastify con valores imputados
        username: {
          type: 'string',
          example: 'cool_username'
        },
        email: { type: 'string' },
        first_name: {
          type: 'string',
          example: 'fname'
        },
        last_name: {
          type: 'string',
          example: 'lname'
        },
        rider_information: {
          type: 'object',
          properties: {
            phone_number: {
              type: 'string',
              example: '+541188888888'
            },
            wallet: {
              type: 'string',
              example: 'as4d65a4s654aeeg54a6s5d4'
            },
            preferred_location_name: {
              type: 'string',
              example: 'Av. Paseo Colón 850'
            },
          },
        },
        driver_information: {
          type: 'object',
          properties: {
            phone_number: {
              type: 'string',
              default: '+541155555555'
            },
            wallet: {
              type: 'string',
              default: 'as4d65a4s654aeeg54a6s5d4'
            },
            preferred_location_name: {
              type: 'string',
              default: 'Av. Paseo Colón 850'
            },
            car: {
              type: 'object',
              properties: {
                plate: {
                  type: 'string',
                  default: 'AAA 123'
                },
                manufacturer: {
                  type: 'string',
                  default: 'Audi'
                },
                model: {
                  type: 'string',
                  default: 'TT'
                },
                year_of_production: {
                  type: 'integer',
                  default: 2022
                },
                color: {
                  type: 'string',
                  default: 'Black'
                },
              }
            }
          },
        },
      },
    },
    404: {
        description: 'User not found',
        type: 'object',
        properties: {
            msg: {type: 'string', default: 'Error. User not found.'},
            userID: {type: 'string', example: 'mateo'},
        }
    },
  },
};


async function usersGET(req, reply) {
  // FIXME: partially implemented
  const responseData = {};
  let userResponse;
  try {
    userResponse = await axios.get(`${settings.SERVICE_USERS_URL}/users/${req.params.userID}`);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return reply.status(404).send(
        {
          msg: 'Error. User not found',
          userID: req.params.userID,
        },
      );
    }
  }
  // FIXME: WTF por qué hay que escribir la siguiente linea para que ande
  const { username } = userResponse.data;
  responseData.username = userResponse.data.username;
  responseData.email = userResponse.data.email;
  responseData.first_name = userResponse.data.first_name;
  responseData.last_name = userResponse.data.last_name;

  const riderResponse = await axios.get(
    `${settings.SERVICE_USERS_URL}/riders/${username}`,
    { validateStatus: false },
  );

  if (riderResponse.status === 200) {
    responseData.rider_information = {};
    const riderInformation = responseData.rider_information;
    riderInformation.phone_number = riderResponse.data.phone_number;
    riderInformation.wallet = riderResponse.data.wallet;
    riderInformation.preferred_location_name = riderResponse.data.preferred_location_name;
  }

  const driverResponse = await axios.get(
    `${settings.SERVICE_USERS_URL}/drivers/${username}`,
    { validateStatus: false },
  );

  if (driverResponse.status === 200) {
    responseData.driver_information = {};
    const driverInformation = responseData.driver_information;
    driverInformation.phone_number = driverResponse.data.phone_number;
    driverInformation.wallet = riderResponse.data.wallet;
    driverInformation.preferred_location_name = riderResponse.data.preferred_location_name;

    driverInformation.car = {};
    driverInformation.car.plate = riderResponse.data.plate;
    driverInformation.car.manufacturer = riderResponse.data.manufacturer;
    driverInformation.carmodel = riderResponse.data.model;
    driverInformation.caryear_of_production = riderResponse.data.year_of_production;
    driverInformation.carcolor = riderResponse.data.color;
  }

  return reply.status(200)
    .send(responseData);
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
