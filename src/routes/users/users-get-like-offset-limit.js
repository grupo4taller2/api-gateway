const axios = require('axios');
const settings = require('../../conf/config');

const { fetchUserData } = require('./users-common');

async function getLikeOffsetLimit(req, reply) {
  const uri = `${settings.serviceUsersURL()}/users/`;
  const foundUsersResponse = await axios.get(uri, { params: req.query });
  const foundUsers = [];
  foundUsersResponse.data.forEach((element) => {
    foundUsers.push(fetchUserData(element));
  });
  const resolvedFoundUsers = await Promise.all(foundUsers);
  return reply.status(200).send(resolvedFoundUsers);
}

module.exports = getLikeOffsetLimit;
