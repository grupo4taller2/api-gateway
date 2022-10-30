const axios = require('axios');
const settings = require('../../conf/config');

async function tripRequest(req, reply) {
  const uri = `${settings.serviceTripsURL()}/trips`;
  let tripResponse;
  try {
    tripResponse = await axios.post(uri, req.body);
  } catch (error) {
    if (!error.response || error.response.status >= 500) {
      return reply.status(503).send(
        { message: 'Service unavailable' },
      );
    }
    if (error.response && error.response.status === 404) {
      return reply.status(503).send(
        { message: 'Service unavailable' },
      );
    }
  }
  tripResponse.data.trip_id = tripResponse.data.id;
  return reply.status(201).send(tripResponse.data);
}

module.exports = tripRequest;
