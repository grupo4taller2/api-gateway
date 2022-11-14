const axios = require('axios');
const settings = require('../../conf/config');

async function ridersQualyAvgGET(req, reply) {
  let riderQualyAvgGetRresponse;
  try {
    riderQualyAvgGetRresponse = await axios.get(`${settings.serviceUsersURL()}/riders/${req.params.username}/qualy/average`);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return reply.status(404).send(
        {
          message: 'Error. Rider not found',
          username: req.params.username,
        },
      );
    }
  }
  return reply.status(200).send(riderQualyAvgGetRresponse.data);
}

module.exports = ridersQualyAvgGET;
