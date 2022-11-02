const axios = require('axios');
const settings = require('../../conf/config');

const { fetchUserData } = require('./users-common');

async function getLikeOffsetLimit(like, offset, limit) {
  const uri = `${settings.serviceUsersURL()}/users/`;
  const params = {};
  if (like) {
    params.username_like = like;
  }
  if (offset) {
    params.offset = offset;
  }
  if (limit) {
    params.limit = limit;
  }
  const foundUsersResponse = await axios.get(uri, params);
  const foundUsers = [];
  foundUsersResponse.data.forEach((element) => {
    foundUsers.push(fetchUserData(element));
  });
  const resolvedFoundUsers = await Promise.all(foundUsers);
  return resolvedFoundUsers;
}

module.exports = getLikeOffsetLimit;
