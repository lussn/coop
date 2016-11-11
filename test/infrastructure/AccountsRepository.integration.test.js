var mongoose = require('mongoose');
var Account = require('../../infrastructure/persistence/authentication/Account.js');
var AccountsRepository = require("../../infrastructure/persistence/AccountsRepository.js");
var assert = require('chai').assert;
var db;

const NEW_USERNAME = 'testUsername';

function assertAccountHasNewUsername(accounts) {
  assert.equal(NEW_USERNAME, accounts.username);
}

describe('AccountsRepository', function() {

  before(function (done) {
    db = mongoose.connect('mongodb://localhost/test');
    done();
  });

  after(function (done) {
    mongoose.connection.close();
    done();
  });

  beforeEach(function (done) {
    var account = new Account({
      username: '12345',
      password: 'test',
      email: 'test@test.com'
    });

    account.save(function () {
      done();
    });
  });

  it('Update should return updated account', function (done) {
    Account.findOne({username: '12345'}, function (err, account) {
      AccountsRepository.update(account._id, {
        username: NEW_USERNAME,
        password: account.password,
        email: account.email
      }).then(function(accounts) {
        assertAccountHasNewUsername(accounts);
        done();
      });
    });
  });
});
