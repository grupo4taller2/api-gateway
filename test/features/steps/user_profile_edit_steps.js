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

Then('El nombre del pasajero con email {string} cambio a {string}', (email, name) => {
    assert.equal(this.full_rider_response.statusCode, 202);
    assert.equal(this.rider_response.first_name, name);
    assert.equal(this.rider_response.email, email);
});

When('como pasajero con email {string} cambio mi apellido a {string}', async (email, newLName) => {
    const payload = {
        last_name: newLName,
    }
    const response = await app.inject({
        method: 'PATCH',
        url: `/api/v1/riders/${email}/status`,
        payload,
    });
    this.full_rider_response = response;
    this.rider_response = response.json();
});

Then('El apellido del pasajero con email {string} cambio a {string}', (email, lName) => {
    assert.equal(this.full_rider_response.statusCode, 202);
    assert.equal(this.rider_response.last_name, lName);
    assert.equal(this.rider_response.email, email);
});

When('como pasajero con email {string} cambio mi telefono a {string}', async (email, newPhoneNumber) => {
    const payload = {
        phone_number: newPhoneNumber,
    }
    const response = await app.inject({
        method: 'PATCH',
        url: `/api/v1/riders/${email}/status`,
        payload,
    });
    this.full_rider_response = response;
    this.rider_response = response.json();
});

Then('El telefono del pasajero con email {string} cambio a {string}', (email, phoneNumber) => {
    assert.equal(this.full_rider_response.statusCode, 202);
    assert.equal(this.rider_response.phone_number, phoneNumber);
    assert.equal(this.rider_response.email, email);
});

When('como pasajero con email {string} cambio mi wallet a {string}', async (email, newWallet) => {
    const payload = {
        wallet: newWallet,
    }
    const response = await app.inject({
        method: 'PATCH',
        url: `/api/v1/riders/${email}/status`,
        payload,
    });
    this.full_rider_response = response;
    this.rider_response = response.json();
});

Then('La wallet del pasajero con email {string} cambio a {string}', (email, wallet) => {
    assert.equal(this.full_rider_response.statusCode, 202);
    assert.equal(this.rider_response.wallet, wallet);
    assert.equal(this.rider_response.email, email);
});

When('como pasajero con email {string} cambio mi ubicacion preferida a {string}', async (email, newLocationName) => {
    const payload = {
        preferred_location_name: newLocationName,
    }
    const response = await app.inject({
        method: 'PATCH',
        url: `/api/v1/riders/${email}/status`,
        payload,
    });
    this.full_rider_response = response;
    this.rider_response = response.json();
});

Then('La ubicacion preferida del pasajero con email {string} cambio a {string}', (email, locationName) => {
    assert.equal(this.full_rider_response.statusCode, 202);
    assert.equal(this.rider_response.preferred_location_name, locationName);
    assert.equal(this.rider_response.email, email);
});
