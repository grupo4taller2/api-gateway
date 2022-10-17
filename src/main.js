const app = require('./server');

const tokenVerifier = require('./auth/firebase_auth');

app.addHook('onRequest', async (req, reply) => {
  await tokenVerifier(app);
});

const start = async() => {
  await app.listen({
    host: process.env.HOST,
    port: process.env.PORT,
  });  
}

start();
