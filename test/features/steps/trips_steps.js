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
    rider_location_name: this.currentRider.preferred_location_name,
    rider_desired_destination_name: string,
    trip_type: 'regular',
  };
  this.tripResponse = await app.inject({
    method: 'POST',
    url: '/api/v1/trips',
    payload: body,
  });
  assert.equal(this.tripResponse.statusCode, 201);
});

Then('se inicia la solicitud de búsqueda de chofer para iniciar el viaje', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});