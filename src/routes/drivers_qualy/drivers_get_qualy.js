const axios = require('axios');
const settings = require('../../conf/config');

async function driversQualyGET(req, reply) {
  let driverQualyGetResponse;
  try {
    driverQualyGetResponse = await axios.get(`${settings.serviceUsersURL()}/qualy/drivers/${req.params.username}`);
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
  return reply.status(201).send(driverQualyGetResponse.data);
}

module.exports = driversQualyGET;
