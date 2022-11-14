const axios = require('axios');
const settings = require('../../conf/config');

async function ridersQualyGET(req, reply) {
  let riderQualyGetResponse;
  try {
    riderQualyGetResponse = await axios.get(`${settings.serviceUsersURL()}/riders/${req.params.username}/qualy`);
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
  return reply.status(201).send(riderQualyGetResponse.data);
}

module.exports = ridersQualyGET;
