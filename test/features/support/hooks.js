/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

const { Before, After, AfterAll, BeforeAll } = require('@cucumber/cucumber');

const { setDefaultTimeout } = require('@cucumber/cucumber');

const builder = require('../../../src/server');

const settings = require('../../../src/conf/config');

const app = builder.buildTestServer();

setDefaultTimeout(60 * 1000);

async function resetDB() {
  await app.inject({
    method: 'POST',
    url: '/reset',
  });
}

// Rollback hooks, tambien se pueden setear variables de entorno
// y obtener informacion sobre el escenario
BeforeAll(async function () {
  await resetDB();
  this.riders = {};
  this.drivers = {};
});

Before(async function () {
  this.riders = {};
  this.drivers = {};
});

After(async function () {
  settings.reset();
  await resetDB();
  this.riders = {};
  this.drivers = {};
});

AfterAll(async function () {
  await resetDB();
});
