const {
  When, Then,
} = require('@cucumber/cucumber');

const assert = require('assert');

const app = require('../../../src/server');

When('Realizo una busqueda por email con {string}', async (email) => {
  const response = await app.inject({
    method: 'GET',
    url: '/api/v1/users/search',
    query: { email },
  });
  assert.equal(response.statusCode, 200);
  this.searched_user = response.json();
});

Then('Obtengo un pasajero con email {string}', (email) => {
  assert.equal(email, this.searched_user.email);
});
