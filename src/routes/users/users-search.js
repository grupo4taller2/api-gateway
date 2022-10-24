const axios = require('axios');
const settings = require('../../conf/config');

// TODO: Handlear 404 y 500 para decidir si se sigue contestando
// o NO.

async function fetchRiderData(email) {
  const riderResponse = await axios.get(
    `${settings.serviceUsersURL()}/riders/${email}`,
    { validateStatus: false },
  );
  let result = {};
  if (riderResponse.status === 200) {
    result = {
      phone_number: result.phone_number,
      wallet: result.wallet,
      preferred_location_name: result.preferred_location_name,
    };
  }
  return result;
}

async function fetchDriverData(email) {
  const driverResponse = await axios.get(
    `${settings.serviceUsersURL()}/drivers/${email}`,
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
      color: result.car_color,
    },
  };
}

async function fetchUserData(user) {
  const fullUserData = user;
  fullUserData.rider_information = fetchRiderData(user.email);
  fullUserData.driver_information = fetchRiderData(user.email);
  return fullUserData;
}

async function findByUsernameLike(like) {
  const uri = `${settings.serviceUsersURL()}/users/search/${like}`;
  const foundUsersResponse = await axios.get(uri);
  const foundUsers = [];
  foundUsersResponse.data.forEach((element) => {
    foundUsers.push(fetchUserData(element));
  });
  const resolvedFoundUsers = await Promise.all(foundUsers);
  return resolvedFoundUsers;
}

async function findByEmail(email) {
  const foundUser = await axios.get(`${settings.serviceUsersURL()}/users/${email}`);
  const userResponse = foundUser.data;
  userResponse.rider_information = await fetchRiderData(userResponse.email);
  userResponse.driver_information = await fetchDriverData(userResponse.email);
  return [userResponse];
}

async function usersSearch(req, reply) {
  const { email } = req.query;
  const { like } = req.query;

  // TODO: Chequear mejor?

  if (like !== undefined) {
    const found = await findByUsernameLike(like);
    return reply.status(200).send(found);
  }
  if (email !== undefined) {
    const found = await findByEmail(email);
    return reply.status(200).send(found);
  }
  return reply.status(404).send(
    {
      message: 'User not found',
    },
  );
}

module.exports = usersSearch;
