var AccountRegisterService = require('../../application/AccountRegisterService.js');
var sinon = require('sinon');
var assert = require('chai').assert;

function assertErrorCallbackIsCalled(callbackError) {
  assert.equal(true, callbackError.calledOnce);
}

describe('AccountRegisterService', function () {
  var credentials = {
    username: 'testusername',
    password1: 'passtest',
    password2: 'passtest',
    email: 'email@test.com'
  };

  describe('Validate', function () {
    it('username with less than 5 character must throw an error', function (done) {
      credentials.username = 'test';
      var callback = sinon.spy();
      var callbackError = sinon.spy();
      AccountRegisterService.register(credentials, callback, callbackError);
      assertErrorCallbackIsCalled(callbackError);
      done();
    });

    it('invalid email with less than 5 character must throw an error', function (done) {
      credentials.email = 'test';
      var callback = sinon.spy();
      var callbackError = sinon.spy();
      AccountRegisterService.register(credentials, callback, callbackError);
      assertErrorCallbackIsCalled(callbackError);
      done();
    });

    it('password1 with less than 5 character must throw an error', function (done) {
      credentials.password1 = 'test';
      var callback = sinon.spy();
      var callbackError = sinon.spy();
      AccountRegisterService.register(credentials, callback, callbackError);
      assertErrorCallbackIsCalled(callbackError);
      done();
    });

    it('password1 and password2 dont match and must throw an error', function (done) {
      credentials.password1 = 'testing';
      var callback = sinon.spy();
      var callbackError = sinon.spy();
      AccountRegisterService.register(credentials, callback, callbackError);
      assertErrorCallbackIsCalled(callbackError);
      done();
    });
  });
});
