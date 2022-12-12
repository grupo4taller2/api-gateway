const axios = require('axios');
const settings = require('../../conf/config');
const verifyRiders = require('../../auth/verify_rider');

async function driversQualyGET(req, reply) {
  const passVerification = await verifyRiders.verifyRider(req.headers.authorization.split(' ')[1], req.body.rider_username);
  if (passVerification === false) {
    return reply.status(400).send(
      { message: 'User is not the same as the token holder' },
    );
  }
  let driverQualyGetResponse;
  try {
    driverQualyGetResponse = await axios.get(`${settings.serviceUsersURL()}/drivers/${req.params.username}/qualy`);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return reply.status(404).send(
        {
          message: 'Error. Driver not found',
          username: req.params.username,
        },
      );
    }
  }
  return reply.status(200).send(driverQualyGetResponse.data);
}

module.exports = driversQualyGET;
