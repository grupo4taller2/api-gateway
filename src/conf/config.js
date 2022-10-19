class Settings {

  constructor() {
    this.serviceUsersURLBAK = process.env.SERVICE_USERS_URL;
  }

  serviceUsersURL() {
    return process.env.SERVICE_USERS_URL;
  }

  // FIXME: move to env var
  apiGatewayVersion() {
    return 'v1';
  }

  reset() {
    process.env['SERVICE_USERS_URL'] = this.serviceUsersURLBAK;
  }

}

const config = new Settings();

module.exports = config;
