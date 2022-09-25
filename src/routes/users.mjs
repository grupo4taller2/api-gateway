import axios from 'axios';

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
        axios.get('http://service-users:7002/api/v1/users/mateoicalvo').then((response) => {
            let tmp = response.data
            delete tmp['email']
            reply.send(response.data); 
        })        
    }); 
    done();
}

export { userRoutes };