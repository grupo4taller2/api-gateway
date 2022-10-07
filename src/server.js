const fastify = require('fastify')({
  logger: true,
});

const API_PREFIX = '/api/v1';

fastify.register(require('./plugins/swagger'));

fastify.register(require('./routes/riders'), { prefix: API_PREFIX });
fastify.register(require('./routes/drivers'), { prefix: API_PREFIX });

fastify.listen({
  host: process.env.API_GATEWAY_HOST,
  port: process.env.API_GATEWAY_PORT,
});
