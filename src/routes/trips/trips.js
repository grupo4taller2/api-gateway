const tripSchemas = require('../../schemas/trip-schemas');

const {
  requestedByRiderTripSchema,
  riderRequestTripSchema,
} = tripSchemas;

const tripRequest = require('./trip-request');

const tripRequestSchema = {
  description: 'Request a new trip as a rider',
  tags: ['trips'],
  body: {
    description: 'Payload for starting a new trip as a rider',
    type: 'object',
    properties: riderRequestTripSchema,
  },
  response: {
    201: {
      description: 'Successful Response',
      type: 'object',
      properties: requestedByRiderTripSchema,
    },
  },
};

async function tripsRoutes(fastify, getUserOpts, done) {
  fastify.post(
    '/trips',
    {
      onRequest: [fastify.verify],
      schema: tripRequestSchema,
      handler: tripRequest,
    },
  );
  done();
}

module.exports = tripsRoutes;
