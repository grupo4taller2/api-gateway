const axios = require('axios');
const settings = require('../../conf/config');

async function adminGet(req, reply) {
  const uri = `${settings.serviceUsersURL()}/admins/${req.params.email}`;
  let adminFullResponse;
  try {
    adminFullResponse = await axios.get(uri);
  } catch (error) {
    if (!error.response || error.response.status >= 500) {
      return reply.status(503).send(
        {
          message: 'Servicio no disponible',
        },
      );
    }
  }
  return reply.status(200).send(adminFullResponse.data);
}

module.exports = adminGet;
