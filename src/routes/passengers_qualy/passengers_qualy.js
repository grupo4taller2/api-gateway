const passengerQualySchemas = require('../../schemas/passenger_qualy_schema');
const passengerGetHandler = require('./passengers_get_qualy');
const passengerGetAvgHandler = require('./passengers_get_avg_qualy');
const passengerPostHandler = require('./passengers_create_qualy');

const {
  PassengerQualyPostSchema,
  PassengerQualyGETSchema,
  PassengerQualyAvgGETSchema,
} = passengerQualySchemas;

async function passengersQualyRoutes(fastify, getUserOpts, done) {
  fastify.get(
    '/passengers/qualy/:username',
    {
      onRequest: [fastify.verify],
      schema: PassengerQualyGETSchema,
      handler: passengerGetHandler,
    },
  );
  fastify.get(
    '/passengers/qualy/average/:username',
    {
      onRequest: [fastify.verify],
      schema: PassengerQualyAvgGETSchema,
      handler: passengerGetAvgHandler,
    },
  );
  fastify.post(
    '/passengers/qualy/create',
    {
      schema: PassengerQualyPostSchema,
      handler: passengerPostHandler,
    },
  );
  done();
}

module.exports = passengersQualyRoutes;
