const riderInformationSchema = {
  type: 'object',
  properties: {
    phone_number: {
      type: 'string',
      example: '+541188888888',
    },
    wallet: {
      type: 'string',
      example: 'as4d65a4s654aeeg54a6s5d4',
    },
    preferred_location_name: {
      type: 'string',
      example: 'Av. Paseo Colón 850',
    },
  },
};

const carInformationSchema = {
  type: 'object',
  properties: {
    plate: {
      type: 'string',
      default: 'AAA 123',
    },
    manufacturer: {
      type: 'string',
      default: 'Audi',
    },
    model: {
      type: 'string',
      default: 'TT',
    },
    year_of_production: {
      type: 'integer',
      default: 2022,
    },
    color: {
      type: 'string',
      default: 'Black',
    },
  },
};

const driverInformationSchema = {
  type: 'object',
  properties: {
    phone_number: {
      type: 'string',
      default: '+541155555555',
    },
    wallet: {
      type: 'string',
      default: 'as4d65a4s654aeeg54a6s5d4',
    },
    preferred_location_name: {
      type: 'string',
      default: 'Av. Paseo Colón 850',
    },
    car: carInformationSchema,
  },
};

const userInformationSchema = {
  username: {
    type: 'string',
    example: 'cool_username',
  },
  email: { type: 'string' },
  first_name: {
    type: 'string',
    example: 'fname',
  },
  last_name: {
    type: 'string',
    example: 'lname',
  },
  rider_information: riderInformationSchema,
  driver_information: driverInformationSchema,
};

const userNotFoundSchema = {
  msg: { type: 'string', default: 'Error. User not found.' },
  username: { type: 'string', example: 'mateo' },
};

exports.userInformationSchema = userInformationSchema;
exports.userNotFoundSchema = userNotFoundSchema;
