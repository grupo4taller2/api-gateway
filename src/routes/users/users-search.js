const axios = require('axios');
const settings = require('../../conf/config');

// TODO: Handlear 404 y 500 para decidir si se sigue contestando
// o NO.

async function _fetchUserData(email) {
  let userResponse;
  try {
    userResponse = await axios.get(`${settings.SERVICE_USERS_URL}/users/${email}`);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return reply.status(200).send();
    }
  }
}

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


async function usersSearch(req, reply) {
  // FIXME: Se comporta distinto según email o like
  
  const email = req.query.email;
  const like = req.query.like;

  // TODO: Chequear mejor?

  if (email !== undefined) {
    return [];
  }

  if (like !== undefined) {
    const found = await findByUsernameLike(like);
    return reply.status(200).send(found);
  }

  
  let foundUsers;
  try {
    foundUsers = await axios.get(`${settings.SERVICE_USERS_URL}/users/search/${email}`)
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return reply.status(200).send();
    }
  }
  
  _fetchRiderData(username, userResponse);
  _fetchDriverData(username, userResponse)

  return reply.status(200)
    .send([responseData]);
}

module.exports = usersSearch;
