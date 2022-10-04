import Fastify from 'fastify';

import userRoutes from './routes/users.mjs';

const fastify = Fastify({ logger: true });

fastify.register(userRoutes);

fastify.listen({
  host: process.env.API_GATEWAY_HOST,
  port: process.env.API_GATEWAY_PORT,
});
