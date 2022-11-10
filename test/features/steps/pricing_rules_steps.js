/* eslint-disable no-unused-vars */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

const assert = require('assert');

const {
  When, Then,
} = require('@cucumber/cucumber');

const builder = require('../../../src/server');

const app = builder.buildTestServer();

When('como usuario {string} obtengo los coeficientes de cotizacion', async function (username) {
  const response = await app.inject({
    method: 'GET',
    url: '/api/v1/pricing/rules',
  });
  assert.equal(response.statusCode, 200);
  this.found_rules = response.json();
  [this.default_rule] = this.found_rules;
});

Then('el coeficiente {string} llamado {string} es {string}', function (string, string2, string3) {
  return 'pending';
});
