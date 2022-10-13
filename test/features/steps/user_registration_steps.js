const {
  Given, When, Then, And
} = require('@cucumber/cucumber');

const assert = require('assert');

const app = require('../../../src/server');

Given('No hay usuarios registrados', async () => {
  await app.inject({
    method: 'POST',
    url: '/reset',
  });
});

When('Me registro como pasajero con email {string} y wallet {string}', async (email, wallet) => {
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

Then('Un pasajero con email {string} y wallet {string} es creado', async (user_email, rider_wallet) => {
  const response = await app.inject({
    method: 'GET',
      url: `api/v1/users/${user_email}`,
  });

  assert.equal(response.statusCode, 200);
  assert.equal(response.json().email, user_email);
  assert.equal(response.json().rider_information.wallet, rider_wallet);
});

When('Me registro como pasajero con email {string} y ubicación preferida {string}', async function (email, preferred_location) {
  const username = email.split('@')[0];
  const body = {
    username: username,
    first_name: 'fname',
    last_name: 'lname',
    email: email,
    password: 'secret',
    wallet: 'wallet123',
    phone_number: '1234567788',
    preferred_location_name: preferred_location,
  };
  const response = await app.inject({
    method: 'POST',
    url: '/api/v1/riders',
    payload: body,
  });
  assert.equal(response.statusCode, 201);
});

Then('La ubicación preferida para el pasajero con email {string} es {string}', async function (email, preferred_location) {
  const response = await app.inject({
    method: 'GET',
    url: `api/v1/users/${email}`,
});

  assert.equal(response.statusCode, 200);
  assert.equal(response.json().rider_information.preferred_location_name, preferred_location);
});

When('Quiero registrarme como chofer con email {string}', function (email) {
    this.driver_data = {};
    this.driver_data.username = email.split('@')[0];
    this.driver_data.email = email;
    this.driver_data.first_name = 'fname';
    this.driver_data.last_name = 'lname';
    this.driver_data.phone_number = '+54123';
    this.driver_data.wallet = 'wallet123';
    this.driver_data.preferred_location_name = 'Av Paseo Colón 850';
});

When('quiero registrar patente del auto {string}', function (car_plate) {
    this.driver_data.car_plate = car_plate;
});

When('quiero registrar fabricante del auto {string}', function (car_manufacturer) {
    this.driver_data.car_manufacturer = car_manufacturer;
});

When('quiero registrar modelo del auto {string}', function (car_model) {
    this.driver_data.car_model = car_model;
});

When('quiero registrar año de fabricación del auto {int}', function (car_year_of_production) {
    this.driver_data.car_year_of_production = car_year_of_production;
});

When('quiero registrar color del auto {string}', function (car_color) {
    this.driver_data.car_color = car_color;
});

When('me registro como chofer', async function () {
    const response = await app.inject({
        method: 'POST',
        url: '/api/v1/drivers',
        payload: this.driver_data,
    });
    assert.equal(response.statusCode, 201);
    this.driver_response = response.json();
});

Then('La patente del auto registrado es {string}', function (car_plate) {
    assert.equal(this.driver_response.car_plate, car_plate)
});


Then('el fabricante del auto es {string}', function (car_manufacturer) {
    assert.equal(this.driver_response.car_manufacturer, car_manufacturer);
});


Then('el modelo del auto es {string}', function (car_model) {
    assert.equal(this.driver_response.car_model, car_model);
});

Then('el año de fabricación del auto es {int}', function (car_year_of_production) {
    assert.equal(this.driver_response.car_year_of_production, car_year_of_production);
});

Then('el color del auto es {string}', function (car_color) {
    assert.equal(this.driver_response.car_color, car_color);
});