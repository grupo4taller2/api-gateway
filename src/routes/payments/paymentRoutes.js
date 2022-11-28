const {
  PaymentPostSchema,
  WithdrawPostSchema,
  getUserWalletSchema,
  getUserUnclaimedMoneySchema,
  PaymentTestPostSchema,
  getContractBalanceSchema,
  depositPostSchema,
} = require('../../schemas/payments_schema');

const createPaymentHandeler = require('./createPayment');
const withdrawHandler = require('./createWithdraw');
const getUserWallet = require('./getWallet');
const getUserUnclaimedMoney = require('./getUnclaimedMoney');
const createPaymentTest = require('./createPaymentTest');
const createDeposit = require('./createDeposit');
const getContractBalance = require('./getContractBalance');

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
    '/payments/create/payment/new',
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
  fastify.post(
    '/payments/create/payment',
    {
      schema: PaymentTestPostSchema,
      handler: createPaymentTest,
    },
  );
  fastify.post(
    '/payments/create/deposit',
    {
      schema: depositPostSchema,
      handler: createDeposit,
    },
  );
  fastify.get(
    '/payments/contract/balance',
    {
      schema: getContractBalanceSchema,
      handler: getContractBalance,
    },
  );

  done();
}

module.exports = paymentsRoutes;
