const fastifyPlugin = require('fastify-plugin');
require('./firebase_app');
// eslint-disable-next-line import/no-unresolved
const { getAuth } = require('firebase-admin/auth');

async function verify(fastify) {
  fastify.decorate('verify', async (request, reply) => {
    try {
      await getAuth()
        .verifyIdToken(request.headers.authorization.split(' ')[1])
        .then((decodedToken) => {
          console.log('EL TOKEN ES CORRECTO');
          const { uid } = decodedToken;
          console.log(uid);
        })
        .catch((error) => {
          console.log('ERROR EN EL TOKEN');
          console.log(error);
          reply.status(401).send(error);
          return reply;
        });
    } catch (error) {
      console.log('ERROR NO SE ENVIO EL TOKEN');
      console.log(error);
      reply.status(401).send({
        error: 'The request sent doesnt has an authorization token',
        status: 401,
      });
      return reply;
    }
    return reply;
  });
}

module.exports = fastifyPlugin(verify);
