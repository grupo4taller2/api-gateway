// eslint-disable-next-line
const { Client } = require('pg');

async function resetPOST() {
  const client = new Client(process.env.DATABASE_URI);
  await client.connect();
  await client.query('TRUNCATE TABLE requested_trips, cars, drivers, riders, users CASCADE;');
  await client.end();
}

async function resetRoutes(fastify, getUserOpts, done) {
  fastify.post(
    '/reset',
    {
      handler: resetPOST,
    },
  );
  done();
}

module.exports = resetRoutes;
