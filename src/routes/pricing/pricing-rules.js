const { pricingRuleSchema, pricingRulePOSTSchema } = require('../../schemas/pricing-rules-schemas');

const pricingRulesGetAll = require('./pricing-rules-get-all');

const pricingRulesCreate = require('./pricing-rule-create');

const pricingRuleUpdate = require('./pricing-rule-update');

const pricingRulesGetAllSchema = {
  description: 'Get current pricing rules',
  tags: ['pricing'],
  response: {
    200: {
      description: 'Successful Response',
      type: 'array',
      items: { type: 'object', properties: pricingRuleSchema },
    },
  },
};

const pricingRulesPostSchema = {
  description: 'Create new pricing rules',
  tags: ['pricing'],
  body: {
    description: 'Payload for creating new rule',
    type: 'object',
    properties: pricingRulePOSTSchema,
  },
  response: {
    201: {
      description: 'Successful Response',
      type: 'object',
      properties: pricingRuleSchema,
    },
  },
};

const pricingRulePatchSchema = {
  description: 'Update rule coefficients',
  tags: ['pricing'],
  body: {
    description: 'Payload for updating existing rule',
    type: 'object',
    properties: pricingRulePOSTSchema,
  },
  params: {
    id: { type: 'string' },
  },
  response: {
    202: {
      description: 'Successful Response',
      type: 'object',
      properties: pricingRuleSchema,
    },
  },
};

async function pricingRulesRoutes(fastify, getUserOpts, done) {
  fastify.get(
    '/pricing/rules',
    {
      onRequest: [fastify.verify],
      schema: pricingRulesGetAllSchema,
      handler: pricingRulesGetAll,
    },
  );
  fastify.post(
    '/pricing/rules',
    {
      onRequest: [fastify.verify],
      schema: pricingRulesPostSchema,
      handler: pricingRulesCreate,
    },
  );
  fastify.patch(
    '/pricing/rules/:id',
    {
      onRequest: [fastify.verify],
      schema: pricingRulePatchSchema,
      handler: pricingRuleUpdate,
    },
  );
  done();
}

module.exports = pricingRulesRoutes;
