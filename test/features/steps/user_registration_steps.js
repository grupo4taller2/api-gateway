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

When('I register as a rider with email {string} and wallet {string}', async (email, wallet) => {
  const username = email.split('@')[0]
  const body = {
    username: username,
    first_name: 'fname',
    last_name: 'lname',
    email: email,
    password: 'secret',
    wallet: wallet,
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

Then('A rider with email {string} and wallet {string} is created', async (user_email, rider_wallet) => {
  const response = await app.inject({
    method: 'GET',
      url: `api/v1/users/${user_email}`,
  });

  assert.equal(response.statusCode, 200);
  assert.equal(response.json().email, user_email);
  assert.equal(response.json().rider_information.wallet, rider_wallet);
});