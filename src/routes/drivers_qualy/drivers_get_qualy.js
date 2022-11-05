const axios = require('axios');
const settings = require('../../conf/config');

async function driversQualyGET(req, reply) {
  let driverQualyGetResponse;
  console.log(req.params);
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
  console.log(driverQualyGetResponse.data);
  return reply.status(201).send(driverQualyGetResponse.data);
}

module.exports = driversQualyGET;
