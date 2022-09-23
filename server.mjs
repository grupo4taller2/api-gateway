import Fastify from 'fastify';

import { userRoutes } from './routes/users.mjs';

const fastify = Fastify({ logger: true });

fastify.register(userRoutes)

const start = async () => {
    try {
        await fastify.listen(3000);
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}

start();