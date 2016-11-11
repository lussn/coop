var ValidatorService = require('../application/ValidatorService.js');
var sinon = require('sinon');
var assert = require('chai').assert;
var expect = require('chai').expect;

function assertValidatorWithInvalidUsernameShouldThrowAnError(username) {
  expect(
    ValidatorService.validateUsername.bind(this, username)
  ).to.throw(Error);
}

function assertValidatorWithValidUsernameWorks(username) {
  expect(
    ValidatorService.validateUsername.bind(this, username)
  ).to.not.throw(Error);
}

function assertValidatorWithInvalidEmailShouldThrowAnError(email) {
  expect(
    ValidatorService.validateEmail.bind(this, email)
  ).to.throw(Error);
}

function assertValidatorWithValidEmailWorks(email) {
  expect(
    ValidatorService.validateEmail.bind(this, email)
  ).to.not.throw(Error);
}

function assertValidatorWithInvalidPasswordShouldThrowAnError(password1, password2) {
  expect(
    ValidatorService.validatePassword.bind(this, password1, password2)
  ).to.throw(Error);
}

function assertValidatorWithoutEqualPasswordsShouldThrowAnError(password1, password2) {
  expect(
    ValidatorService.validatePassword.bind(this, password1, password2)
  ).to.throw(Error);
}

function assertValidatorWithValidPasswordsWorks(password1, password2) {
  expect(
    ValidatorService.validatePassword.bind(this, password1, password2)
  ).to.not.throw(Error);
}

function assertValidatorWithEmptyValueShouldThrowAnError(value) {
  expect(
    ValidatorService.validateNotBlank.bind(this, value)
  ).to.throw(Error);
}
describe('ValidatorService', function () {

  describe('Validate', function () {
    it('username with less than 5 character must throw an error', function (done) {
      var username = 'test';
      assertValidatorWithInvalidUsernameShouldThrowAnError.call(this, username);
      done();
    });

    it('valid username shouldnt throw an error', function (done) {
      var username = 'testName';
      assertValidatorWithValidUsernameWorks.call(this, username);
      done();
    });

    it('empty value should throw an error', function (done) {
      var value = '';
      assertValidatorWithEmptyValueShouldThrowAnError.call(this, value);
      done();
    });

    it('invalid email with less than 5 character must throw an error', function (done) {
      var email = 'test.com';
      assertValidatorWithInvalidEmailShouldThrowAnError.call(this, email);
      done();
    });

    it('valid email shouldnt throw an error', function (done) {
      var email = 'lucho@coop.es';
      assertValidatorWithValidEmailWorks.call(this, email);
      done();
    });

    it('password1 with less than 5 character must throw an error', function (done) {
      var password1 = 'test';
      var password2 = 'test';
      assertValidatorWithInvalidPasswordShouldThrowAnError.call(this, password1, password2);
      done();
    });

    it('password1 and password2 dont match and must throw an error', function (done) {
      var password1 = 'testing';
      var password2 = 'testpassword';
      assertValidatorWithoutEqualPasswordsShouldThrowAnError.call(this, password1, password2);
      done();
    });

    it('valid passwords shouldnt throw an error', function (done) {
      var password1 = 'testpassword';
      var password2 = 'testpassword';
      assertValidatorWithValidPasswordsWorks.call(this, password1, password2);
      done();
    });
  });
});
