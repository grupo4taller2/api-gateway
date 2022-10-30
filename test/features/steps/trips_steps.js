/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

const {
  When, Then,
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
  // Write code here that turns the phrase above into concrete actions
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
