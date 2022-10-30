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

Then('se inicia la solicitud de búsqueda de chofer para iniciar el viaje desde {string} hasta {string}', function (origin, destination) {
  // Write code here that turns the phrase above into concrete actions
  const trip = this.tripResponse.json();
  assert.equal(trip.origin.address, origin);
  assert.equal(trip.destination.address, destination);
});
