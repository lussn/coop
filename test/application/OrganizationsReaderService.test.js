var sinon = require('sinon');
var assert = require('chai').assert;
var proxyquire = require('proxyquire');

const ACCOUNT_ID = 5;
const COOP_ID = '7777dd2c5606c3b20f86227c';

function assertFindAllIsCalled() {
  assert.equal(true, this.OrganizationsRepository.findAll.withArgs(ACCOUNT_ID).calledOnce);
}

function assertFindByIdIsCalled() {
  assert.equal(true, this.OrganizationsRepository.findById.withArgs(ACCOUNT_ID, COOP_ID).calledOnce);
}

describe('OrganizationsReaderService', function () {

  describe('Get all organizations', function () {

    before(function () {
      this.OrganizationsRepository = {findAll: sinon.spy(), findById: sinon.spy()};
      this.OrganizationsReaderService = proxyquire(
        '../../application/OrganizationsReaderService.js',
        {'../infrastructure/persistence/OrganizationsRepository': this.OrganizationsRepository}
      );
    });

    it('should call organizations repository with account id', function (done) {
      this.OrganizationsReaderService.findAll(ACCOUNT_ID);
      assertFindAllIsCalled.call(this);
      done();
    });

    it('should call organizations repository with account id and organization id', function (done) {
      this.OrganizationsReaderService.findById(ACCOUNT_ID, COOP_ID);
      assertFindByIdIsCalled.call(this);
      done();
    });
  });
});
