const axios = require('axios');
const settings = require('../../conf/config');

async function driversQualyGET(req, reply) {
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
