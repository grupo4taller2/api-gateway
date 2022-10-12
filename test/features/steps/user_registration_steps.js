const {
  Given, When, Then,
} = require('@cucumber/cucumber');

const assert = require('assert');

const app = require('../../../src/server');

Given('There are no users', async () => {
  await app.inject({
    method: 'POST',
    url: '/reset',
  });
});

When('I register as a rider with email {string} and wallet {string}', async (string, string2) => {
  const body = {
    username: string,
    first_name: 'fname',
    last_name: 'lname',
    email: string,
    password: 'secret',
    wallet: string2,
    phone_number: '1234567788',
    preferred_location_name: "El Monumental",
  };
  const response = await app.inject({
    method: 'POST',
    url: '/api/v1/riders',
    payload: body,
  });
  assert.equal(response.statusCode, 201);
});

Then('A rider with email {string} and wallet {string} is created', async (email, wallet) => {
  const response = await app.inject({
    method: 'GET',
    url: `api/v1/users/${email}`,
  });
  assert.equal(response.data.wallet, wallet);
});