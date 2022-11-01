const { After, AfterAll, BeforeAll } = require('@cucumber/cucumber');

const { setDefaultTimeout } = require('@cucumber/cucumber');

const builder = require('../../../src/server');

const settings = require('../../../src/conf/config');

const app = builder.buildTestServer();

setDefaultTimeout(60 * 1000);

async function resetDB() {
  settings.reset();
  await app.inject({
    method: 'POST',
    url: '/reset',
  });
}

// Rollback hooks, tambien se pueden setear variables de entorno
// y obtener informacion sobre el escenario
BeforeAll(resetDB);

After(resetDB);

AfterAll(resetDB);
