import axios from 'axios';

const getUserOpts = {
  schema: {
    200: {
      type: 'object',
      properties: {
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        username: { type: 'string' },
        email: { type: 'string' },
      },
    },
  },
};

export default async function userRoutes(fastify, getUserOpts, done) {
  fastify.get('/users', async (req, reply) => {
    let response = await axios.get('http://service-users:35002/api/v1/healthcheck');
    return response.data;
  });
  done();
}
