const driver_qualy_schemas = require('../../schemas/driver_qualy_schema')
const driver_get_handler = require('./drivers_get_qualy')
const driver_get_avg_handler = require('./drivers_get_avg_qualy')
const driver_post_handler = require('./drivers_create_qualy')


const {driverQualyPostSchema,driverQualyGETSchema, 
    driverQualyAvgGETSchema} = driver_qualy_schemas;


async function drivers_qualy_routes(fastify, getUserOpts, done) {
    fastify.get(
    '/drivers/qualy/:username',
    {
        schema: driverQualyGETSchema,
        handler: driver_get_handler,
    },
    );
    fastify.get(
        '/drivers/qualy/average/:username',
        {
            schema: driverQualyAvgGETSchema,
            handler: driver_get_avg_handler,
        },
    );
    fastify.post(
        '/drivers/qualy/create',
        {
          schema: driverQualyPostSchema,
          handler: driver_post_handler,
        },
      );
    done();
}

module.exports = drivers_qualy_routes;