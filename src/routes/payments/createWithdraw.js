const axios = require('axios');
const settings = require('../../conf/config');

async function createWithdrawPOST(req, reply) {
  let createWithdrawResponse;
  try {
    createWithdrawResponse = await axios.post(`${settings.servicePaymentsURL()}/payments/create/withdraw`, req.body);
  } catch (error) {
    if (!error.response || error.response.status >= 500) {
      return reply.status(503).send(
        {
          message: 'Servicio no disponible',
        },
      );
    }
    if (error.response && error.response.status >= 400) {
      return reply.status(error.response.status).send(
        {
          message: error.response.data.message,
          username: error.response.data.username,
        },
      );
    }
  }
  return reply.status(201).send(createWithdrawResponse.data);
}

module.exports = createWithdrawPOST;
