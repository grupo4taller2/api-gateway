const app = require('./server');

app.listen({
  host: process.env.HOST,
  port: process.env.PORT,
});
