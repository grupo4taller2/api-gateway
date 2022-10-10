const fastify = require('fastify')({
  logger: true,
});

const API_PREFIX = '/api/v1';

fastify.register(require('./plugins/swagger'));

fastify.register(require('./routes/riders'), { prefix: API_PREFIX });
fastify.register(require('./routes/drivers'), { prefix: API_PREFIX });
fastify.register(require('./routes/auth'), { prefix: API_PREFIX });

if (process.env.DANGER_RESET) {
  fastify.register(require('./routes/reset'), { prefix: API_PREFIX });
}

fastify.listen({
  host: process.env.HOST,
  port: process.env.PORT,
});
