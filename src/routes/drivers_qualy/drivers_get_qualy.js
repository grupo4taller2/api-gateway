const axios = require('axios');
const settings = require('../../conf/config');





async function drivers_qualy_GET(req, reply) {
    let driver_qualy_get_response;
    console.log(req.params);
    try {
        driver_qualy_get_response = await axios.get(`${settings.serviceUsersURL()}/qualy/drivers/${req.params.username}`);
    } catch (error) {
        if (!error.response || error.response.status >= 500) {
        return reply.status(503).send(
            {
            message: 'Servicio no disponible',
            },
        );
        }
    }
    console.log(driver_qualy_get_response.data)
    return reply.status(201).send(driver_qualy_get_response.data);
}



module.exports = drivers_qualy_GET;