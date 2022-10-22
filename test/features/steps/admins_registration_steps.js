/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

const {
  Given, When, Then,
} = require('@cucumber/cucumber');

const assert = require('assert');

const builder = require('../../../src/server');

const app = builder.buildTestServer();

When('El administrador por defecto registra al usuario con email {string} como administrador', async function (email) {
  const body = { email };
  this.full_response = await app.inject({
    method: 'POST',
    url: '/api/v1/admins',
    payload: body,
  });
});

Then('Existe un administrador con email {string}', async function (email) {
  assert.equal(this.full_response.statusCode, 201);
  this.full_response = await app.inject({
    method: 'GET',
    url: `api/v1/admins/${email}`,
  });
  assert.equal(this.full_response.statusCode, 200);
  assert.equal(this.full_response.json().email, email);
});

When('El administrador por defecto registra un administrador sin email', async function () {
  this.full_response = await app.inject({
    method: 'POST',
    url: '/api/v1/admins',
    payload: { email: '' },
  });
});

Then('El sistema indicará que falta el email con mensaje {string}', function (msg) {
  assert.equal(this.full_response.json().message, msg);
});

Then('el sistema no permitirá el registro', function () {
  assert.equal(this.full_response.statusCode, 422);
});

Given('El registro de administrador fallará por un error de servicio', function () {
  process.env.SERVICE_USERS_URL = 'invalid';
});
