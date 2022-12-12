const axios = require('axios');
const settings = require('../../conf/config');
const verifyDrivers = require('../../auth/verify_driver');

async function ridersQualyAvgGET(req, reply) {
  const passVerification = await verifyDrivers.verifyDriver(req.headers.authorization.split(' ')[1], req.body.driver_username);
  if (passVerification === false) {
    return reply.status(400).send(
      { message: 'User is not the same as the token holder' },
    );
  }
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
  console.log(riderQualyAvgGetRresponse);
  return reply.status(200).send(riderQualyAvgGetRresponse.data);
}

module.exports = ridersQualyAvgGET;
