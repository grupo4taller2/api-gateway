const axios = require('axios');
const settings = require('../../conf/config');

async function tripGet(req, reply) {
  const tripsURI = `${settings.serviceTripsURL()}/trips/${req.params.id}`;
  let tripResponse;
  try {
    tripResponse = await axios.get(tripsURI);
  } catch (error) {
    if (!error.response || error.response.status >= 500) {
      return reply.status(503).send(
        { message: 'Service unavailable' },
      );
    }
  }

  const origin = {};
  origin.address = tripResponse.data.origin.address;
  origin.latitude = tripResponse.data.origin.latitude;
  origin.longitude = tripResponse.data.origin.longitude;
  const destination = {};
  destination.address = tripResponse.data.destination.address;
  destination.latitude = tripResponse.data.destination.latitude;
  destination.longitude = tripResponse.data.destination.longitude;

  const responseBody = {};
  responseBody.trip_id = tripResponse.data.id;
  responseBody.origin = origin;
  responseBody.destination = destination;
  responseBody.trip_type = tripResponse.data.type;
  responseBody.estimated_time = tripResponse.data.estimated_time;
  responseBody.distance = tripResponse.data.distance;
  responseBody.estimated_price = tripResponse.data.estimated_price;
  responseBody.trip_state = tripResponse.data.state;

  return reply.status(200).send(responseBody);
}

module.exports = tripGet;
