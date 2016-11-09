var ModalService = require('../public/components/utils/ModalService');
var sinon = require('sinon');
var assert = require('chai').assert;

describe('ModalService', function () {
  describe('getModalKey function', function () {
    it('should return account key if ask for it', function (done) {
      assert.equal('account', ModalService.getAccountModalKey());
      done();
    });
    it('should return organization key if ask for it', function (done) {
      assert.equal('organization', ModalService.getOrganizationModalKey());
      done();
    });
    it('should return product key if ask for it', function (done) {
      assert.equal('product', ModalService.getProductModalKey());
      done();
    });
  });
  describe('shouldOpenModal function', function () {
    it('should return true with correct account key', function (done) {
      assert.equal(true, ModalService.shouldOpenAccountModal('account'));
      done();
    });
    it('should return true with correct organization key', function (done) {
      assert.equal(true, ModalService.shouldOpenOrganizationModal('organization'));
      done();
    });
    it('should return true with correct product key', function (done) {
      assert.equal(true, ModalService.shouldOpenProductModal('product'));
      done();
    });
    it('should return false with wrong key', function (done) {
      assert.equal(false, ModalService.shouldOpenAccountModal('test'));
      done();
    });
  });
});
