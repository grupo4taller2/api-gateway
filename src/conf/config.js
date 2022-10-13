class Settings {
  static SERVICE_USERS_URL = process.env.SERVICE_USERS_URL;

  static SERVICE_AUTH_URL = process.env.SERVICE_AUTH_URL;

  // FIXME: move to env var
  static API_GATEWAY_VERSION = 'v1';
}

module.exports = Settings;
