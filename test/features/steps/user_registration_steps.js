
const cucumber = require('../cucumber');

const Given = cucumber.Given;
const When = cucumber.When;
const Then = cucumber.Then;

const assert = require('assert');

const builder = require('../../../src/server');

const app = builder.buildTestServer();

Given('No hay usuarios registrados', async () => {
  await app.inject({
    method: 'POST',
    url: '/reset',
  });
});

When('Me registro como pasajero con email {string} y wallet {string}', async (email, wallet) => {
  const username = email.split('@')[0];
  this.registered_username = username;
  const body = {
    username,
    first_name: 'fname',
    last_name: 'lname',
    email,
    password: 'secret',
    wallet,
    phone_number: '1234567788',
    preferred_location_name: 'El Monumental',
  };
  const response = await app.inject({
    method: 'POST',
    url: '/api/v1/riders',
    payload: body,
  });
});

// TODO: refactor steps, it's doing literally the same as above
Given('Me registro como pasajero con email {string} y usuario {string}', async (email, username) => {
  this.registered_username = username;
  this.registered_email = email
  const body = {
    username,
    first_name: 'fname',
    last_name: 'lname',
    email,
    password: 'secret',
    wallet: 'wallet',
    phone_number: '1234567788',
    preferred_location_name: 'El Monumental',
  };
  const response = await app.inject({
    method: 'POST',
    url: '/api/v1/riders',
    payload: body,
  });
});

Then('Un pasajero con email {string} y wallet {string} es creado', async (userEmail, riderWallet) => {
  const response = await app.inject({
    method: 'GET',
    url: `api/v1/users/${this.registered_username}`,
  });

  assert.equal(response.statusCode, 200);
  assert.equal(response.json().email, userEmail);
  assert.equal(response.json().rider_information.wallet, riderWallet);
});

When('Me registro como pasajero con email {string} y ubicación preferida {string}', async (email, preferredLocation) => {
  const username = email.split('@')[0];
  const body = {
    username,
    first_name: 'fname',
    last_name: 'lname',
    email,
    password: 'secret',
    wallet: 'wallet123',
    phone_number: '1234567788',
    preferred_location_name: preferredLocation,
  };
  const response = await app.inject({
    method: 'POST',
    url: '/api/v1/riders',
    payload: body,
  });
});

Then('La ubicación preferida para el pasajero con email {string} es {string}', async (email, preferredLocation) => {
  const username = email.split('@')[0];
  const response = await app.inject({
    method: 'GET',
    url: `api/v1/users/${username}`,
  });

  assert.equal(response.statusCode, 200);
  assert.equal(response.json().rider_information.preferred_location_name, preferredLocation);
});

When('Quiero registrarme como chofer con email {string}', (email) => {
  this.driver_data = {};
  this.driver_data.username = email.split('@')[0];
  this.driver_data.email = email;
  this.driver_data.first_name = 'fname';
  this.driver_data.last_name = 'lname';
  this.driver_data.phone_number = '+54123';
  this.driver_data.wallet = 'wallet123';
  this.driver_data.preferred_location_name = 'Av Paseo Colón 850';
});

When('quiero registrar patente del auto {string}', (carPlate) => {
  this.driver_data.car_plate = carPlate;
});

When('quiero registrar fabricante del auto {string}', (carManufacturer) => {
  this.driver_data.car_manufacturer = carManufacturer;
});

When('quiero registrar modelo del auto {string}', (carModel) => {
  this.driver_data.car_model = carModel;
});

When('quiero registrar año de fabricación del auto {int}', (carYearOfProduction) => {
  this.driver_data.car_year_of_production = carYearOfProduction;
});

When('quiero registrar color del auto {string}', (carColor) => {
  this.driver_data.car_color = carColor;
});

When('me registro como chofer', async () => {
  const response = await app.inject({
    method: 'POST',
    url: '/api/v1/drivers',
    payload: this.driver_data,
  });
  this.full_driver_response = response;
  this.driver_response = response.json();
});

Then('La patente del auto registrado es {string}', (carPlate) => {
  assert.equal(this.driver_response.car_plate, carPlate);
});

Then('el fabricante del auto es {string}', (carManufacturer) => {
  assert.equal(this.driver_response.car_manufacturer, carManufacturer);
});

Then('el modelo del auto es {string}', (carModel) => {
  assert.equal(this.driver_response.car_model, carModel);
});

Then('el año de fabricación del auto es {int}', (carYearOfProduction) => {
  assert.equal(this.driver_response.car_year_of_production, carYearOfProduction);
});

Then('el color del auto es {string}', (carColor) => {
  assert.equal(this.driver_response.car_color, carColor);
});

Given('el registro fallara por un error del servicio', () => {
  process.env['SERVICE_USERS_URL'] = 'invalid';
});

Then('se devuelve un mensaje de error {string}', (message) =>  {
  assert.equal(this.full_driver_response.statusCode, 503);
  assert.equal(this.driver_response.msg, message);
});