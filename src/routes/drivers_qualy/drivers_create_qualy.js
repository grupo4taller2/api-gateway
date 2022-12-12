const axios = require('axios');
const settings = require('../../conf/config');
const verifyDrivers = require('../../auth/verify_driver');

async function driversQualyPOST(req, reply) {
  const passVerification = await verifyDrivers.verifyDriver(req.headers.authorization.split(' ')[1], req.body.driver_username);
  if (passVerification === false) {
    return reply.status(400).send(
      { message: 'User is not the same as the token holder' },
    );
  }
  let driverQualyCreationResponse;
  try {
    driverQualyCreationResponse = await axios.post(`${settings.serviceUsersURL()}/drivers/qualy/create`, req.body);
  } catch (error) {
    if (error.response && error.response.status >= 400) {
      return reply.status(error.response.status).send(
        {
          message: error.response.data,
        },
      );
    }
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
