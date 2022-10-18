const axios = require('axios');
const settings = require('../../conf/config');

// TODO: Handlear 404 y 500 para decidir si se sigue contestando
// o NO.

async function _fetchRiderData(username) {
  const riderResponse = await axios.get(
    `${settings.SERVICE_USERS_URL}/riders/${username}`,
    { validateStatus: false },
  );
  let result = {}
  if (riderResponse.status === 200) {
    result = {
      phone_number: result.phone_number,
      wallet: result.wallet,
      preferred_location_name: result.preferred_location_name
    };
  }
  return result;
}

async function _fetchDriverData(username) {
  const driverResponse = await axios.get(
    `${settings.SERVICE_USERS_URL}/drivers/${username}`,
    { validateStatus: false },
  );
  let result = {};
  if (driverResponse.status === 200) {
    result = driverResponse.data;
  }
  return {
    phone_number: result.phone_number,
    wallet: result.wallet,
    preferred_location_name: result.preferred_location_name,
    car: {
      plate: result.car_plate,
      manufacturer: result.car_manufacturer,
      model: result.car_model,
      year_of_production: result.car_year_of_production,
      color: result.car_color
    }
  };
}

async function findByUsernameLike(like) {
  const uri = `${settings.SERVICE_USERS_URL}/users/search/${like}`;
  const foundUsersResponse = await axios.get(uri);
  let foundUsers = [];
  for (const user of foundUsersResponse.data) {
    user.rider_information = await _fetchRiderData(user.username);
    user.driver_information = await _fetchDriverData(user.username);
    foundUsers.push(user);
  }
  return foundUsers;
}

async function findByEmail(email) {
  const foundUser = await axios.get(`${settings.SERVICE_USERS_URL}/users/${email}`);
  const userResponse = foundUser.data;
  userResponse.rider_information = await _fetchRiderData(userResponse.username);
  userResponse.rider_information = await _fetchDriverData(userResponse.username);
  return [userResponse];
}

async function usersSearch(req, reply) {
  const email = req.query.email;
  const like = req.query.like;

  // TODO: Chequear mejor?

  if (like !== undefined) {
    const found = await findByUsernameLike(like);
    return reply.status(200).send(found);
  }
  if (email !== undefined) {
    const found = await findByEmail(email);
    return reply.status(200).send(found);
  }
}

module.exports = usersSearch;
