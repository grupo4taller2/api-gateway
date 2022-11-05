const axios = require('axios');
const settings = require('../../conf/config');

async function passengersQualyGET(req, reply) {
  let passengerQualyGetResponse;
  console.log(req.params);
  try {
    passengerQualyGetResponse = await axios.get(`${settings.serviceUsersURL()}/qualy/passengers/${req.params.username}`);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return reply.status(404).send(
        {
          message: 'Error. Passenger not found',
          username: req.params.username,
        },
      );
    }
  }
  console.log(passengerQualyGetResponse.data);
  return reply.status(201).send(passengerQualyGetResponse.data);
}

module.exports = passengersQualyGET;
