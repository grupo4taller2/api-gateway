const tripSchemas = require('../../schemas/trip-schemas');

const {
  requestedByRiderTripSchema,
  estimatedTripSchema,
  riderRequestTripSchema,
} = tripSchemas;

const tripRequest = require('./trip-request');
const tripPrice = require('./trip-price');
const tripGet = require('./trip-get');

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

const tripGetSchema = {
  description: 'Get trip by id',
  tags: ['trips'],
  params: {
    id: {
      type: 'string',
      default: 'a8ae2781-c86a-4719-a4b5-2117942c23c6',
    },
  },
  response: {
    200: {
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
    origin_address: { type: 'string', description: 'Current location address' },
    destination_address: { type: 'string', description: 'Destination address' },
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
  fastify.get(
    '/trips/:id',
    {
      onRequest: [fastify.verify],
      schema: tripGetSchema,
      handler: tripGet,
    },
  );
  done();
}

module.exports = tripsRoutes;
