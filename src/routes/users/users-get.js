const axios = require('axios');
const settings = require('../../conf/config');

async function usersGET(req, reply) {
  const responseData = {};
  let userResponse;
  try {
    userResponse = await axios.get(`${settings.SERVICE_USERS_URL}/users/${req.params.username}`);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return reply.status(404).send(
        {
          msg: 'Error. User not found',
          username: req.params.username,
        },
      );
    }
  }
  // FIXME: WTF por qué hay que escribir la siguiente linea para que ande
  const { username } = userResponse.data;
  responseData.username = userResponse.data.username;
  responseData.email = userResponse.data.email;
  responseData.first_name = userResponse.data.first_name;
  responseData.last_name = userResponse.data.last_name;

  const riderResponse = await axios.get(
    `${settings.SERVICE_USERS_URL}/riders/${username}`,
    { validateStatus: false },
  );

  if (riderResponse.status === 200) {
    responseData.rider_information = {};
    const riderInformation = responseData.rider_information;
    riderInformation.phone_number = riderResponse.data.phone_number;
    riderInformation.wallet = riderResponse.data.wallet;
    riderInformation.preferred_location_name = riderResponse.data.preferred_location_name;
  }

  const driverResponse = await axios.get(
    `${settings.SERVICE_USERS_URL}/drivers/${username}`,
    { validateStatus: false },
  );

  if (driverResponse.status === 200) {
    responseData.driver_information = {};
    const driverInformation = responseData.driver_information;
    driverInformation.phone_number = driverResponse.data.phone_number;
    driverInformation.wallet = riderResponse.data.wallet;
    driverInformation.preferred_location_name = riderResponse.data.preferred_location_name;

    driverInformation.car = {};
    driverInformation.car.plate = riderResponse.data.plate;
    driverInformation.car.manufacturer = riderResponse.data.manufacturer;
    driverInformation.carmodel = riderResponse.data.model;
    driverInformation.caryear_of_production = riderResponse.data.year_of_production;
    driverInformation.carcolor = riderResponse.data.color;
  }

  return reply.status(200)
    .send(responseData);
}

module.exports = usersGET;
