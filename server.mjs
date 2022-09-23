import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

fastify.get('/users', (req, reply) => {
    reply.send({ message: 'Hello from /users' }); 
});

const start = async () => {
    try {
        await fastify.listen(3000);
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}

start();