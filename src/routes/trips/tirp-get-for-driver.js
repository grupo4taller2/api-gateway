const axios = require('axios');
const settings = require('../../conf/config');

// FIXME: reuse
function responseToTrip(tripResponse) {
  const origin = {};
  origin.address = tripResponse.origin.address;
  origin.latitude = tripResponse.origin.latitude;
  origin.longitude = tripResponse.origin.longitude;

  const destination = {};
  destination.address = tripResponse.destination.address;
  destination.latitude = tripResponse.destination.latitude;
  destination.longitude = tripResponse.destination.longitude;

  const responseBody = {};
  responseBody.trip_id = tripResponse.id;
  responseBody.origin = origin;
  responseBody.destination = destination;
  responseBody.trip_type = tripResponse.type;
  responseBody.estimated_time = tripResponse.estimated_time;
  responseBody.distance = tripResponse.distance;
  responseBody.estimated_price = tripResponse.estimated_price;
  responseBody.trip_state = tripResponse.state;

  return responseBody;
}

async function tripGetForDriver(req, reply) {
  const tripsURI = `${settings.serviceTripsURL()}/trips`;
  const params = {
    driver_username: req.params.driver_username,
    trip_state: req.params.trip_state,
    offset: req.params.offset,
    limit: req.params.limit,
  };
  let tripResponse;
  try {
    tripResponse = await axios.get(tripsURI, { params });
  } catch (error) {
    if (!error.response || error.response.status >= 500) {
      return reply.status(503).send(
        { message: 'Service unavailable' },
      );
    }
  }

  const foundTrips = [];
  tripResponse.data.forEach((trip) => {
    foundTrips.push(responseToTrip(trip));
  });

  return reply.status(200).send(foundTrips);
}

module.exports = tripGetForDriver;
