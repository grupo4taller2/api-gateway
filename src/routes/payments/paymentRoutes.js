const {
  PaymentPostSchema,
  WithdrawPostSchema,
  getUserWalletSchema,
  getUserUnclaimedMoneySchema,
} = require('../../schemas/payments_schema');

const createPaymentHandeler = require('./createPayment');
const withdrawHandler = require('./createWithdraw');
const getUserWallet = require('./getWallet');
const getUserUnclaimedMoney = require('./getUnclaimedMoney');

async function paymentsRoutes(fastify, getUserOpts, done) {
  fastify.get(
    '/payments/:username/wallet',
    {
      schema: getUserWalletSchema,
      handler: getUserWallet,
    },
  );
  fastify.get(
    '/payments/:username/unclaimed/money',
    {
      schema: getUserUnclaimedMoneySchema,
      handler: getUserUnclaimedMoney,
    },
  );
  fastify.post(
    '/payments/create/payment',
    {
      schema: PaymentPostSchema,
      handler: createPaymentHandeler,
    },
  );
  fastify.post(
    '/payments/create/withdraw',
    {
      schema: WithdrawPostSchema,
      handler: withdrawHandler,
    },
  );
  done();
}

module.exports = paymentsRoutes;
