/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

const {
  Given, When, Then,
} = require('@cucumber/cucumber');

const assert = require('assert');

const builder = require('../../../src/server');

const app = builder.buildTestServer();

When('solicito iniciar un viaje normal hacia {string}', async function (string) {
  const body = {
    rider_username: this.currentRider.username,
    rider_origin_address: this.currentRider.preferred_location_name,
    rider_destination_address: string,
    trip_type: 'regular',
  };
  this.tripResponse = await app.inject({
    method: 'POST',
    url: '/api/v1/trips',
    payload: body,
  });
  assert.equal(this.tripResponse.statusCode, 201);
});

Then('se inicia la solicitud de búsqueda de chofer para iniciar el viaje desde {string} hasta {string}', async function (origin, destination) {
  const tripResponse = await app.inject({
    method: 'GET',
    url: `/api/v1/trips/${this.tripResponse.json().trip_id}`,
  });
  const receivedOriginAddress = tripResponse.json().origin.address;
  const receivedDestinationAddress = tripResponse.json().destination.address;
  const receivedState = tripResponse.json().trip_state;
  assert.equal(origin, receivedOriginAddress);
  assert.equal(destination, receivedDestinationAddress);
  assert.equal(receivedState, 'looking_for_driver');
});

Given('como usuario {string} solicito iniciar un viaje normal hacia {string}', async function (username, destination) {
  const body = {
    rider_username: username,
    rider_origin_address: this.riders[username].preferred_location_name,
    rider_destination_address: destination,
    trip_type: 'regular',
  };
  this.tripResponse = await app.inject({
    method: 'POST',
    url: '/api/v1/trips',
    payload: body,
  });
  assert.equal(this.tripResponse.statusCode, 201);
});

When('como usuario {string} solicito los viajes disponibles con offset {int} limit {int}', async function (username, offset, limit) {
  const query = {
    driver_username: username,
    offset,
    limit,
    trip_state: 'looking_for_driver',
  };

  const response = await app.inject({
    method: 'GET',
    url: '/api/v1/trips',
    query,
  });
  this.drivers[username].available_trips = response.json();
  this.allAvailableTrips = response.json();
  assert.equal(response.statusCode, 200);
});

Then('obtengo {int} viajes disponibles para {string}', function (nTrips, username) {
  assert.equal(this.drivers[username].available_trips.length, nTrips);
});

Then('la direccion de origen del viaje es {string}', function (originAddress) {
  const obtainedOriginAddress = this.allAvailableTrips[0].origin.address;
  assert.equal(obtainedOriginAddress, originAddress);
});

Then('la direccion de destino del viaje es {string}', function (destinationAddress) {
  const obtainedDestinationAddress = this.allAvailableTrips[0].destination.address;
  assert.equal(obtainedDestinationAddress, destinationAddress);
});

Then('el tipo de viaje es {string}', function (type) {
  const obtainedType = this.allAvailableTrips[0].trip_type;
  assert.equal(obtainedType, type);
});

Then('el usuario que solicito el viaje es {string}', function (username) {
  const obtainedRiderUsername = this.allAvailableTrips[0].rider_username;
  assert.equal(obtainedRiderUsername, username);
});
