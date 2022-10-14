const app = require('fastify')({
  logger: true,
});

// TODO: Move to env var
const API_PREFIX = '/api/v1';

app.register(require('./plugins/swagger'));

app.register(require('./routes/users/users'), { prefix: API_PREFIX });
app.register(require('./routes/riders'), { prefix: API_PREFIX });
app.register(require('./routes/drivers'), { prefix: API_PREFIX });
// app.register(require('./routes/auth'), { prefix: API_PREFIX });
app.register(require('./routes/healthcheck'), { prefix: API_PREFIX });

if (process.env.DANGER_RESET) {
  app.register(require('./routes/reset'));
}

module.exports = app;
