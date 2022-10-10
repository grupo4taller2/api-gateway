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
    preferred_latitude: -34.612580,
    preferred_longitude: -58.408061,
  };
  await axios.post(`${process.env.HOST}:${process.env.PORT}/api/v1/riders`, body);
});

Then('A rider with email {string} and wallet {string} is created', (string, string2) => {
  return 'pending';
});