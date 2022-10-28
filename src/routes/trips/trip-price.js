const axios = require('axios');
const settings = require('../../conf/config');

async function tripPrice(req, reply) {
  const directionsURI = `${settings.serviceTripsURL()}/directions/search`;
  const pricingURI = `${settings.servicePricingURL()}/estimations`;
  const directionsParams = {
    origin: req.query.origin_address,
    destination: req.query.destination_address,
  };

  let directionsResponse;
  try {
    directionsResponse = await axios.get(directionsURI, { params: directionsParams });
  } catch (error) {
    if (!error.response || error.response.status >= 500) {
      return reply.status(503).send(
        { message: 'Service unavailable' },
      );
    }
  }

  let pricingResponse;
  try {
    const pricingParams = directionsParams;
    pricingParams.type = req.query.type;
    pricingParams.estimated_time = directionsResponse.data.estimated_time;
    pricingParams.distance = directionsResponse.data.distance;
    pricingParams.origin_address = req.query.origin_address;
    pricingParams.origin_latitude = directionsResponse.data.origin_latitude;
    pricingParams.origin_longitude = directionsResponse.data.origin_longitude;
    pricingParams.destination_address = req.query.destination_address;
    pricingParams.destination_latitude = directionsResponse.data.destination_latitude;
    pricingParams.destination_longitude = directionsResponse.data.destination_longitude;
    pricingResponse = await axios.get(pricingURI, { params: pricingParams });
  } catch (error) {
    if (!error.response || error.response.status >= 500) {
      return reply.status(503).send(
        { message: 'Service unavailable' },
      );
    }
  }
  const location = {};
  location.name = req.query.location_name;
  location.latitude = directionsResponse.data.location_latitude;
  location.longitude = directionsResponse.data.location_longitude;
  const destination = {};
  destination.name = req.query.destination_name;
  destination.latitude = directionsResponse.data.destination_latitude;
  destination.longitude = directionsResponse.data.destination_longitude;

  const responseBody = {};
  responseBody.location = location;
  responseBody.destination = destination;
  responseBody.trip_type = req.query.trip_type;
  responseBody.estimated_time = directionsResponse.data.estimated_time;
  responseBody.distance = directionsResponse.data.distance;
  responseBody.estimated_price = pricingResponse.data.estimated_price;

  return reply.status(200).send(responseBody);
}

module.exports = tripPrice;
