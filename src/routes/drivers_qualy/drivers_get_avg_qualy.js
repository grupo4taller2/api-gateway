const axios = require('axios');
const settings = require('../../conf/config');

async function driversQualyAvgGET(req, reply) {
  let driverQualyAvgGetResponse;
  console.log(req.params);
  try {
    driverQualyAvgGetResponse = await axios.get(`${settings.serviceUsersURL()}/qualy/drivers/average/${req.params.username}`);
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
  console.log(driverQualyAvgGetResponse.data);
  return reply.status(201).send(driverQualyAvgGetResponse.data);
}

module.exports = driversQualyAvgGET;
