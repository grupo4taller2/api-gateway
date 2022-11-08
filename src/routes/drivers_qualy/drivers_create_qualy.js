const axios = require('axios');
const settings = require('../../conf/config');

async function driversQualyPOST(req, reply) {
  let driverQualyCreationResponse;
  try {
    driverQualyCreationResponse = await axios.post(`${settings.serviceUsersURL()}/drivers/qualy/create`, req.body);
  } catch (error) {
    if (!error.response || error.response.status >= 500) {
      return reply.status(503).send(
        {
          message: 'Servicio no disponible',
        },
      );
    }
  }
  return reply.status(201).send(driverQualyCreationResponse.data);
}

module.exports = driversQualyPOST;
