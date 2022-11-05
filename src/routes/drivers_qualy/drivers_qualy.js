const driverQualySchemas = require('../../schemas/driver_qualy_schema');
const driverGetHandler = require('./drivers_get_qualy');
const driverGetAvgHandler = require('./drivers_get_avg_qualy');
const driverPostHandler = require('./drivers_create_qualy');

const {
  driverQualyPostSchema,
  driverQualyGETSchema,
  driverQualyAvgGETSchema,
} = driverQualySchemas;

async function driversQualyRoutes(fastify, getUserOpts, done) {
  fastify.get(
    '/drivers/qualy/:username',
    {
      schema: driverQualyGETSchema,
      handler: driverGetHandler,
    },
  );
  fastify.get(
    '/drivers/qualy/average/:username',
    {
      schema: driverQualyAvgGETSchema,
      handler: driverGetAvgHandler,
    },
  );
  fastify.post(
    '/drivers/qualy/create',
    {
      schema: driverQualyPostSchema,
      handler: driverPostHandler,
    },
  );
  done();
}

module.exports = driversQualyRoutes;
