const axios = require('axios');
const settings = require('../../conf/config');

async function userWalletGET(req, reply) {
  let getUserWalletResponse;
  try {
    getUserWalletResponse = await axios.get(`${settings.servicePaymentsURL()}/payments/${req.params.username}/wallet`);
  } catch (error) {
    if (!error.response || error.response.status >= 500) {
      return reply.status(503).send(
        {
          message: 'Servicio no disponible',
        },
      );
    }
    if (error.response && error.response.status === 404) {
      return reply.status(error.response.status).send(
        {
          message: error.response.message,
          username: error.response.username,
        },
      );
    }
  }
  return reply.status(200).send(getUserWalletResponse.data);
}

module.exports = userWalletGET;
