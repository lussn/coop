var sinon = require('sinon');
var Bluebird = require('bluebird');
require('sinon-as-promised')(Bluebird);
var assert = require('chai').assert;
var proxyquire = require('proxyquire');

const ACCOUNT_ID = '56c9dd2c5606c3b20f86220c';
const PRODUCT_ID = 'ttt9dd2c5606c3b20f86220c';
const ORDER_ID = 'ttt9dd2c5606c3b20f8yy20c';

function assertSaveIsCalled() {
  assert.equal(true, this.OrdersRepository.save.calledOnce);
}

function assertToggleActiveIsCalled() {
  assert.equal(true, this.OrdersRepository.toggleActive.withArgs(ORDER_ID, false).calledOnce);
}

function prepareSaveOrder() {
  this.OrdersRepository.save.resolves(
    {
      active: true,
      user: ACCOUNT_ID,
      products: [PRODUCT_ID],
      _id: ORDER_ID
    }
  );
}

function prepareToggleActiveOrder() {
  this.OrdersRepository.toggleActive.resolves(
    {
      active: false,
      user: ACCOUNT_ID,
      products: [PRODUCT_ID],
      _id: ORDER_ID
    }
  );
}

function prepareAddOrderToAccount() {
  this.AccountsRepository.addOrderToAccount.resolves(
    {
      username: 'TEST',
      email: 'TEST123',
      _id: ACCOUNT_ID,
      orders: [ORDER_ID]
    }
  );
}

function prepareFindById() {
  this.OrdersRepository.findById.resolves(
    {
      active: true,
      user: ACCOUNT_ID,
      products: [PRODUCT_ID],
      _id: ORDER_ID
    }
  );
}

describe('OrderRegisterService', function () {
  before(function () {
    this.OrdersRepository = {
      save: sinon.stub(),
      toggleActive: sinon.stub(),
      findById: sinon.stub()
    };

    this.AccountsRepository = {
      addOrderToAccount: sinon.stub()
    };

    this.OrderRegisterService = proxyquire(
      '../../application/OrderRegisterService.js',
      {
        '../infrastructure/persistence/OrdersRepository': this.OrdersRepository,
        '../infrastructure/persistence/AccountsRepository': this.AccountsRepository
      }
    );
  });

  it('saveWithOneProduct should call order repository with order model', function (done) {
    prepareSaveOrder.call(this);
    prepareAddOrderToAccount.call(this);

    this.OrderRegisterService
      .saveWithOneProduct({ productId: PRODUCT_ID}, ACCOUNT_ID)
      .then(function () {
        assertSaveIsCalled.call(this);
        done();
      }.bind(this));
  });

  it('toggleActive should call order repository with order id and opposite value', function (done) {
    prepareFindById.call(this);
    prepareToggleActiveOrder.call(this);

    this.OrderRegisterService
      .toggleActive(ORDER_ID)
      .then(function () {
        assertToggleActiveIsCalled.call(this);
        done();
    }.bind(this));

  });
});
