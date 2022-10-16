const app = require('./server');

app.addHook('onRequest', (req, reply, done) => {
  
  done();
})

app.listen({
  host: process.env.HOST,
  port: process.env.PORT,
});
