const { pricingRuleSchema } = require('../../schemas/pricing-rules-schemas');

const pricingRulesGetAll = require('./pricing-rules-get-all');

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

async function pricingRulesRoutes(fastify, getUserOpts, done) {
  fastify.get(
    '/pricing/rules',
    {
      onRequest: [fastify.verify],
      schema: pricingRulesGetAllSchema,
      handler: pricingRulesGetAll,
    },
  );
  done();
}

module.exports = pricingRulesRoutes;
