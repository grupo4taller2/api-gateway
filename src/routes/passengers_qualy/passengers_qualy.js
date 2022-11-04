const passenger_qualy_schemas = require('../../schemas/passenger_qualy_schema')
const passenger_get_handler = require('./passengers_get_qualy')
const passenger_get_avg_handler = require('./passengers_get_avg_qualy')
const passenger_post_handler = require('./passengers_create_qualy')


const {PassengerQualyPostSchema,PassengerQualyGETSchema, 
    PassengerQualyAvgGETSchema} = passenger_qualy_schemas;


async function passengers_qualy_routes(fastify, getUserOpts, done) {
    fastify.get(
    '/passengers/qualy/:username',
    {
        schema: PassengerQualyGETSchema,
        handler: passenger_get_handler,
    },
    );
    fastify.get(
        '/passengers/qualy/average/:username',
        {
            schema: PassengerQualyAvgGETSchema,
            handler: passenger_get_avg_handler,
        },
    );
    fastify.post(
        '/passengers/qualy/create',
        {
          schema: PassengerQualyPostSchema,
          handler: passenger_post_handler,
        },
      );
    done();
}

module.exports = passengers_qualy_routes;