const axios = require('axios');
const settings = require('../../conf/config');

async function passengersQualyPOST(req, reply) {
  let passengerQualyCreationResponse;
  try {
    passengerQualyCreationResponse = await axios.post(`${settings.serviceUsersURL()}/qualy/passengers/create`, req.body);
  } catch (error) {
    if (!error.lintresponse || error.response.status >= 500) {
      return reply.status(503).send(
        {
          message: 'Servicio no disponible',
        },
      );
    }
  }
  return reply.status(201).send(passengerQualyCreationResponse.data);
}

module.exports = passengersQualyPOST;
