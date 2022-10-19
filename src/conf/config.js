class Settings {

  serviceUsersURL() {
    return process.env.SERVICE_USERS_URL;
  }

  // FIXME: move to env var
  apiGatewayVersion() {
    return 'v1';
  }

}

const settings = new Settings();

module.exports = settings;
