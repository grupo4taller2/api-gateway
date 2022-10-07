const axios = require('axios')

riders_schema = {
  description: 'This is the description that swagger will show',
  tags: ['riders'],
  response: {
      200: {
          description: 'Success Response',
          type: 'object',
          properties: {
              msg: { type: 'string' }
          }
      }
  }
}
async function riders_get(req, reply) {
  let response = await axios.get('http://service-users:35002/api/v1/healthcheck');
  return response.data;
}

async function ridersRoutes(fastify, getUserOpts, done) {
  fastify.get('/riders',{
    schema: riders_schema,
    handler: riders_get}
  );
  done();
}

module.exports = ridersRoutes;
