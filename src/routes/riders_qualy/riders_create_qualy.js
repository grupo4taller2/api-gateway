const axios = require('axios');
const settings = require('../../conf/config');

async function ridersQualyPOST(req, reply) {
  let riderQualyCreationResponse;
  try {
    riderQualyCreationResponse = await axios.post(`${settings.serviceUsersURL()}/riders/qualy/create`, req.body);
  } catch (error) {
    if (!error.lintresponse || error.response.status >= 500) {
      return reply.status(503).send(
        {
          message: 'Servicio no disponible',
        },
      );
    }
  }
  return reply.status(201).send(riderQualyCreationResponse.data);
}

module.exports = ridersQualyPOST;
