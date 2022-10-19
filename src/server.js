// TODO: Move to env var
const API_PREFIX = '/api/v1';

const fastify = require('fastify');

function buildServer() {
  const app = fastify({
    logger: true,
  })

  app.register(require('./plugins/swagger'));
  app.register(require('./auth/firebase_auth_test.js'));
  app.register(require('./routes/users/users'), { prefix: API_PREFIX });
  app.register(require('./routes/riders'), { prefix: API_PREFIX });
  app.register(require('./routes/drivers'), { prefix: API_PREFIX });
  app.register(require('./routes/healthcheck'), { prefix: API_PREFIX });
  return app;
}

function buildTestServer() {
  const app = fastify({
    logger: true,
  });
  app.register(require('./auth/firebase_auth_test.js'));
  app.register(require('./routes/users/users'), { prefix: API_PREFIX });
  app.register(require('./routes/riders'), { prefix: API_PREFIX });
  app.register(require('./routes/drivers'), { prefix: API_PREFIX });
  app.register(require('./routes/healthcheck'), { prefix: API_PREFIX });
  app.register(require('./routes/reset'));
  return app;
}

exports.buildServer = buildServer;
exports.buildTestServer =buildTestServer;
