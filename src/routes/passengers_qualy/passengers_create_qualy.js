const axios = require('axios');
const settings = require('../../conf/config');



async function passengers_qualy_POST(req, reply) {
  let driver_qualy_creation_response;
  console.log(req.body);
  try {
    driver_qualy_creation_response = await axios.post(`${settings.serviceUsersURL()}/qualy/passengers/create`, req.body);
  } catch (error) {
    if (!error.lintresponse || error.response.status >= 500) {
      return reply.status(503).send(
        {
          message: 'Servicio no disponible',
        },
      );
    }
  }
  return reply.status(201).send(driver_qualy_creation_response.data);
}




  
  module.exports = passengers_qualy_POST;