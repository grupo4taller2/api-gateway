const getUserOpts = {
    schema: {
        200: {
            type: 'object',
                properties: {
                    first_name: { type: 'string' },
                    last_name: { type: 'string' },
                    username: { type: 'string' },
                    email: { type: 'string' }
                }
        }
    }
};

function userRoutes(fastify, getUserOpts, done) {
    fastify.get('/users', (req, reply) => {
        
        reply.send({ message: 'Hello from /users' }); 
    }); 
    done();
}

export { userRoutes };