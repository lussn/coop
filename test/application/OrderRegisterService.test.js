var sinon = require('sinon');
var Bluebird = require('bluebird');
require('sinon-as-promised')(Bluebird);
var assert = require('chai').assert;
var proxyquire = require('proxyquire');

const ACCOUNT_ID = '56c9dd2c5606c3b20f86220c';
const PRODUCT_ID = 'ttt9dd2c5606c3b20f86220c';

function assertSaveIsCalled() {
  assert.equal(true, this.OrdersRepository.save.calledOnce);
}

describe('OrderRegisterService', function () {
  before(function () {
    this.OrdersRepository = {
      save: sinon.spy()
    };

    this.OrderRegisterService = proxyquire(
      '../../application/OrderRegisterService.js',
      {
        '../infrastructure/persistence/OrdersRepository': this.OrdersRepository
      }
    );
  });

  it('saveWithOneProduct should call order repository with order model', function (done) {
    this.OrderRegisterService.saveWithOneProduct({ accountId: ACCOUNT_ID, productId: PRODUCT_ID});
    assertSaveIsCalled.call(this);
    done();
  });
});
