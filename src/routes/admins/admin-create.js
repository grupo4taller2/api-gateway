const axios = require('axios');
const settings = require('../../conf/config');

async function adminCreate(req, reply) {
  const uri = `${settings.serviceUsersURL()}/admins`;
  let adminFullResponse;
  try {
    adminFullResponse = await axios.post(uri, req.body);
  } catch (error) {
    if (!error.response || error.response.status >= 500) {
      return reply.status(503).send(
        {
          message: 'Servicio no disponible',
        },
      );
    }
    if (error.response && error.response.status === 422) {
      return reply.status(422).send(
        {
          message: 'Error: Missing email',
        },
      );
    }
  }
  return reply.status(201).send(adminFullResponse.data);
}

module.exports = adminCreate;
