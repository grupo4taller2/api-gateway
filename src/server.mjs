import Fastify from 'fastify';

import { userRoutes } from './routes/users.mjs';

const fastify = Fastify({ logger: true });

fastify.register(userRoutes)

const start = async () => {
    try {
        await fastify.listen(process.env.API_GATEWAY_PORT, '0.0.0.0');
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}

start();