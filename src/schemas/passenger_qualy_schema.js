const PassengerQualyPostSchema = {
  description: 'Endpoint for creating passengers qualifications',
  tags: ['passengers qualy'],
  body: {
    description: 'Payload for creating a new passenger qualy',
    type: 'object',
    properties: {
      passenger_username: { type: 'string' },
      qualy: { type: 'integer' },
      opinion: { type: 'string' },
      driver_username: { type: 'string' },
    },
  },
  response: {
    201: {
      description: 'Success Response',
      type: 'object',
      properties: {
        passenger_username: { type: 'string', example: 'juan' },
        qualy: { type: 'integer', example: 4 },
        opinion: { type: 'string', example: 'good driver' },
        driver_username: { type: 'string', example: 'franco' },
      },
    },
  },
};

const PassengerQualyAvgGETSchema = {
  description: 'Get the average qualification of a passenger',
  tags: ['passengers qualy'],
  params: {
    username: {
      type: 'string',
      default: 'username',
    },
  },
  response: {
    200: {
      description: 'Success Response',
      type: 'integer',
    },
  },
  404: {
    description: 'Passenger not found',
    type: 'object',
    properties: {
      message: { type: 'string', default: 'Error. Passenger not found.' },
      username: { type: 'string' },
    },
  },
};

const PassengerQualyGETSchema = {
  description: 'Get the qualification of a passenger',
  tags: ['passengers qualy'],
  params: {
    username: {
      type: 'string',
      default: 'username',
    },
  },
  response: {
    200: {
      description: 'Success Response',
      type: 'object',
      properties: {
        passenger_username: { type: 'string' },
        qualy: { type: 'integer' },
        opinion: { type: 'string' },
        driver_username: { type: 'string' },
      },
    },
    404: {
      description: 'Passenger not found',
      type: 'object',
      properties: {
        message: { type: 'string', default: 'Error. Passenger not found.' },
        username: { type: 'string' },
      },
    },
  },
};

exports.PassengerQualyPostSchema = PassengerQualyPostSchema;
exports.PassengerQualyGETSchema = PassengerQualyGETSchema;
exports.PassengerQualyAvgGETSchema = PassengerQualyAvgGETSchema;
