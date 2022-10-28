const tripSchemas = require('../../schemas/trip-schemas');

const {
  requestedByRiderTripSchema,
  estimatedTripSchema,
  riderRequestTripSchema,
} = tripSchemas;

const tripRequest = require('./trip-request');
const tripPrice = require('./trip-price');

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

const tripPriceSchema = {
  description: 'Estimate price of a trip as a rider',
  tags: ['trips'],
  querystring: {
    location_name: { type: 'string', description: 'Current location address' },
    destination_name: { type: 'string', description: 'Destination address' },
    trip_type: { type: 'string', description: 'Trip type' },
  },
  response: {
    200: {
      description: 'Successful Response',
      type: 'object',
      properties: estimatedTripSchema,
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
  fastify.get(
    '/trips/price',
    {
      onRequest: [fastify.verify],
      schema: tripPriceSchema,
      handler: tripPrice,
    },
  );
  done();
}

module.exports = tripsRoutes;
