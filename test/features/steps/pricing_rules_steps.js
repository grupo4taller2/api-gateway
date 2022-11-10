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
  [this.current_rule] = this.found_rules;
});

Then('el coeficiente {string} llamado {string} es {string}', function (name, repr, value) {
  assert.equal(this.current_rule[repr], value);
});

When('quiero utilizar valor {string} para el coeficiente {string}', function (value, repr) {
  this.pricing_rules_coefficients[repr] = value;
});

When('creo una regla de cotizacion', async function () {
  const response = await app.inject({
    method: 'POST',
    url: '/api/v1/pricing/rules',
    body: this.pricing_rules_coefficients,
  });
  assert.equal(response.statusCode, 201);
  this.current_rule = response.json();
});
