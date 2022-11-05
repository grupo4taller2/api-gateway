const axios = require('axios');
const settings = require('../../conf/config');

async function passengersQualyAvgGET(req, reply) {
  let passengerQualyAvgGetRresponse;
  console.log(req.params);
  try {
    passengerQualyAvgGetRresponse = await axios.get(`${settings.serviceUsersURL()}/qualy/passengers/average/${req.params.username}`);
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
  console.log(passengerQualyAvgGetRresponse.data);
  return reply.status(201).send(passengerQualyAvgGetRresponse.data);
}

module.exports = passengersQualyAvgGET;
