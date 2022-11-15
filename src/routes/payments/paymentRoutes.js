const {
  getRiderWalletSchema,
  PaymentPostSchema,
  WithdrawPostSchema,
  getDriverDataWalletSchema,
  getDriverEarnedMoneySchema,
} = require('../../schemas/payments_schema');

const getRiderWalletHandler = require('./getRIderWallet');
const createPaymentHandeler = require('./createPayment');
const withdrawHandler = require('./createWithdraw');
const getDriverEarnedMoney = require('./getDriverEarnedMoney');
const getDriverWalletData = require('./getDriverWallet');

async function paymentsRoutes(fastify, getUserOpts, done) {
  fastify.get(
    '/riders/:username/wallet',
    {
      schema: getRiderWalletSchema,
      handler: getRiderWalletHandler,
    },
  );
  fastify.get(
    '/drivers/:username/wallet',
    {
      schema: getDriverDataWalletSchema,
      handler: getDriverWalletData,
    },
  );
  fastify.post(
    '/create/payment',
    {
      schema: PaymentPostSchema,
      handler: createPaymentHandeler,
    },
  );
  fastify.post(
    '/create/withdraw',
    {
      schema: WithdrawPostSchema,
      handler: withdrawHandler,
    },
  );
  fastify.get(
    '/drivers/:username/earned/money',
    {
      schema: getDriverEarnedMoneySchema,
      handler: getDriverEarnedMoney,
    },
  );

  done();
}

module.exports = paymentsRoutes;
