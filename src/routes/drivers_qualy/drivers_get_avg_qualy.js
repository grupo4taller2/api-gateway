const axios = require('axios');
const settings = require('../../conf/config');

async function driversQualyAvgGET(req, reply) {
  let driverQualyAvgGetResponse;
  try {
    driverQualyAvgGetResponse = await axios.get(`${settings.serviceUsersURL()}/drivers/${req.params.username}/qualy/average`);
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
  return reply.status(200).send(driverQualyAvgGetResponse.data);
}

module.exports = driversQualyAvgGET;