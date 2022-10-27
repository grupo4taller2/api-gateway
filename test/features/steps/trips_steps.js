/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

const {
  When, Then,
} = require('@cucumber/cucumber');

const assert = require('assert');

const builder = require('../../../src/server');

const app = builder.buildTestServer();

When('solicito iniciar un viaje hacia {string}', function (string) {
  const body = {
    username:
    rider_location_name:
    rider_desired_destination_name:
    trip_type:
  }
  this.tripResponse = await app.inject({
    method: 'POST',
    url: '/api/v1/trips'
  })
});

Then('se inicia la solicitud de búsqueda de chofer para iniciar el viaje', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});
