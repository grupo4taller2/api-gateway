/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

const {
  When, Then,
} = require('@cucumber/cucumber');

const assert = require('assert');

const builder = require('../../../src/server');

const app = builder.buildTestServer();

When('solicito cotizar un viaje {string} hacia {string}', async function (type, destinationLocationName) {
  const originLocationName = this.currentRider.preferred_location_name;

  this.pricingResponse = await app.inject({
    method: 'GET',
    url: '/api/v1/trips/price',
    query: {
      location_name: originLocationName,
      destination_name: destinationLocationName,
      trip_type: type,
    },
  });
  this.pricedTrip = this.pricingResponse.json();
});

Then('se devuelve el precio para el viaje', function () {
  const price = this.pricedTrip.estimated_price;
  assert(typeof price === 'number');
});

Then('se devuelve como nombre de origen {string}', function (locationName) {
  assert.equal(this.pricedTrip.location.name, locationName);
});

Then('se devuelve como latitud de origen aproximadamente {float}', function (locationLatitude) {
  // https://gis.stackexchange.com/questions/8650/measuring-accuracy-of-latitude-and-longitude
  const obtainedLatitude = this.pricedTrip.location.latitude.toFixed(4);
  const desiredLatitude = locationLatitude.toFixed(4);
  const delta = Math.abs(obtainedLatitude - desiredLatitude);
  assert(delta <= 0.0005);
});

Then('se devuelve como longitud de origen aproximadamente {float}', function (locationLongitude) {
  const obtainedLongitude = this.pricedTrip.location.longitude.toFixed(4);
  const desiredLongitude = locationLongitude.toFixed(4);
  const delta = Math.abs(obtainedLongitude - desiredLongitude);
  assert(delta <= 0.0005);
});

Then('se devuelve como nombre de destino {string}', function (destinationName) {
  assert.equal(this.pricedTrip.destination.name, destinationName);
});

Then('se devuelve como latitud de destino aproximadamente {float}', function (destinationLongitude) {
  const obtainedLatitude = this.pricedTrip.destination.latitude.toFixed(4);
  const desiredLatitude = destinationLongitude.toFixed(4);
  const delta = Math.abs(obtainedLatitude - desiredLatitude);
  assert(delta <= 0.0005);
});

Then('se devuelve como longitud de destino aproximadamente {float}', function (destinationLongitude) {
  const obtainedLongitude = this.pricedTrip.destination.longitude.toFixed(4);
  const desiredLongitude = destinationLongitude.toFixed(4);
  const delta = Math.abs(obtainedLongitude - desiredLongitude);
  assert(delta <= 0.0005);
});

Then('se devuelve un tiempo estimado', function () {
  const timeRegex = /^A\d{6}$/i;
  const time = this.pricedTrip.estimated_time;
  assert(timeRegex.test(time));
});

Then('se devuelve una distancia', function () {
  // FIXME IS NUMERIC AND km
  const { distance } = this.pricedTrip;
  assert(distance.includes('km') || distance.includes('m'));
  const distanceValue = distance.split(' ')[0];
  const floatRegex = /^(\d*\.)?\d+$/gim;
  assert(floatRegex.test(distanceValue));
});
