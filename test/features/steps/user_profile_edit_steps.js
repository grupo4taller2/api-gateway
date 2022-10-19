const {
    Given, When, Then,
  } = require('@cucumber/cucumber');
  
const assert = require('assert');

const builder = require('../../../src/server');

const app = builder.buildTestServer();

When('Quiero registrarme como pasajero con usuario {string}',  (username) => {
    this.rider_data = {};
    this.rider_data.username = username;
});

When('quiero registrarme como pasajero con email {string}', (email) => {
    this.rider_data.email = email;
});

When('quiero registrarme como pasajero con nombre {string}', (fName) => {
    this.rider_data.first_name = fName;
});

When('quiero registrarme como pasajero con apellido {string}', (lName) => {
    this.rider_data.last_name = lName;
});

When('quiero registrarme como pasajero con telefono {string}', (phoneNumber) => {
    this.rider_data.phone_number = phoneNumber;
});

When('quiero registrarme como pasajero con wallet {string}', (wallet) => {
    this.rider_data.wallet = wallet;
});

When('quiero registrarme como pasajero con ubicacion preferida {string}', (locationName) => {
    this.rider_data.preferred_location_name = locationName;
});

When('me registro como pasajero', async () => {
    const response = await app.inject({
        method: 'POST',
        url: '/api/v1/riders',
        payload: this.rider_data,
    });
    this.full_rider_response = response;
    this.rider_response = response.json();
});

When('como pasajero con email {string} cambio mi nombre a {string}', async (email, newName) => {
    const payload = {
        first_name: newName,
    }
    const response = await app.inject({
        method: 'PATCH',
        url: `/api/v1/riders/${email}/status`,
        payload,
    });
    this.full_rider_response = response;
    this.rider_response = response.json();
});

Then('El nombre del pasajero con email {string} es {string}', (email, name) => {
    assert.equal(this.full_rider_response.statusCode, 202);
    assert.equal(this.rider_response.first_name, name);
    assert.equal(this.rider_response.email, email);
});
