var ValidatorService = require('../application/ValidatorService.js');
var sinon = require('sinon');
var assert = require('chai').assert;
var expect = require('chai').expect;

describe('ValidatorService', function () {

    describe('Validate', function () {
        it('username with less than 5 character must throw an error', function (done) {
            var username = 'test';
            expect(
                ValidatorService.validateUsername.bind(this, username)
            ).to.throw(Error);
            done();
        });

        it('valid username shouldnt throw an error', function (done) {
            var username = 'testName';
            expect(
                ValidatorService.validateUsername.bind(this, username)
            ).to.not.throw(Error);
            done();
        });

        it('invalid email with less than 5 character must throw an error', function (done) {
            var email = 'test.com';
            expect(
                ValidatorService.validateEmail.bind(this, email)
            ).to.throw(Error);
            done();
        });

        it('valid email shouldnt throw an error', function (done) {
            var email = 'lucho@coop.es';
            expect(
                ValidatorService.validateEmail.bind(this, email)
            ).to.not.throw(Error);
            done();
        });

        it('password1 with less than 5 character must throw an error', function (done) {
            var password1 = 'test';
            var password2 = 'test';
            expect(
                ValidatorService.validatePassword.bind(this, password1, password2)
            ).to.throw(Error);
            done();
        });

        it('password1 and password2 dont match and must throw an error', function (done) {
            var password1 = 'testing';
            var password2 = 'testpassword';
            expect(
                ValidatorService.validatePassword.bind(this, password1, password2)
            ).to.throw(Error);
            done();
        });

        it('valid passwords shouldnt throw an error', function (done) {
            var password1 = 'testpassword';
            var password2 = 'testpassword';
            expect(
                ValidatorService.validatePassword.bind(this, password1, password2)
            ).to.not.throw(Error);
            done();
        });
    });
});
