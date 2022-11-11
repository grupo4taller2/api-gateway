const pricingRuleSchema = {
  id: { type: 'string', example: 'ac45db64d5a6b4c5cd46ab54' },
  c_trips_last_30m: { type: 'string', example: '1.23' },
  c_km: { type: 'string', example: '1.23' },
  c_rating: { type: 'string', example: '1.23' },
  c_min_price: { type: 'string', example: '1.23' },
};

const pricingRulePOSTSchema = {
  c_trips_last_30m: { type: 'string', default: '1.23' },
  c_km: { type: 'string', default: '1.23' },
  c_rating: { type: 'string', default: '1.23' },
  c_min_price: { type: 'string', default: '1.23' },
};

exports.pricingRuleSchema = pricingRuleSchema;
exports.pricingRulePOSTSchema = pricingRulePOSTSchema;
