const riderRequestTripSchema = {
  rider_username: { type: 'string' },
  rider_location_name: { type: 'string' },
  rider_desired_destination_name: { type: 'string' },
  trip_type: { type: 'string' },
};

const requestedByRiderTripSchema = {
  trip_id: {
    type: 'string',
    example: 'a9eca685e679d5c8679ed5',
  },
  rider_username: {
    type: 'string',
    example: 'mateo95',
  },
  location: {
    type: 'object',
    properties: {
      name: { type: 'string', example: 'Av. Paseo Colón 850, Buenos Aires' },
      latitude: { type: 'number', example: -34.6174635 },
      longitude: { type: 'number', example: -58.369979 },
    },
  },
  destination: {
    type: 'object',
    properties: {
      name: { type: 'string', example: 'Gral. Las Heras 2214, Buenos Aires' },
      latitude: { type: 'number', example: -34.5885454 },
      longitude: { type: 'number', example: -58.3984251 },
    },
  },
  trip_type: {
    type: 'string',
    example: 'regular',
  },
  estimated_time: {
    type: 'string',
    example: 'T013000',
  },
  estimated_price: {
    type: 'number',
    example: 0.35,
  },
  distance: {
    type: 'string',
    example: '6.3 km',
  },
  timestamp: {
    type: 'string',
    format: 'date-time',
  },
};

const estimatedTripSchema = {
  origin: {
    type: 'object',
    properties: {
      address: { type: 'string', example: 'Av. Paseo Colón 850, Buenos Aires' },
      latitude: { type: 'number', example: -34.6174635 },
      longitude: { type: 'number', example: -58.369979 },
    },
  },
  destination: {
    type: 'object',
    properties: {
      address: { type: 'string', example: 'Gral. Las Heras 2214, Buenos Aires' },
      latitude: { type: 'number', example: -34.5885454 },
      longitude: { type: 'number', example: -58.3984251 },
    },
  },
  trip_type: {
    type: 'string',
    example: 'regular',
  },
  estimated_time: {
    type: 'string',
    example: 'T013000',
  },
  estimated_price: {
    type: 'number',
    example: 0.35,
  },
  distance: {
    type: 'string',
    example: '6.3 km',
  }, // FIXME: agregar la ruta encodeada aca?
};

exports.riderRequestTripSchema = riderRequestTripSchema;
exports.requestedByRiderTripSchema = requestedByRiderTripSchema;
exports.estimatedTripSchema = estimatedTripSchema;
