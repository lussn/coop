var mongoose = require('mongoose');
var CooperativesRepository = require("../infrastructure/persistence/CooperativesRepository.js");
var Cooperative = require("../domain/cooperatives/Cooperative.js");
var assert = require('chai').assert;
var db;

const ACCOUNT_ID = '56c9dd2c5606c3b20f86220c';

var createCooperative = function (name) {
    var cooperative = new Cooperative({
        name: name,
        code: name,
        email: name+'@test.com'
    });
    cooperative.members.push(ACCOUNT_ID);
    CooperativesRepository.save(cooperative);
    this.cooperativeId = cooperative._id;
};

describe('CooperativesRepository', function() {

    before(function(done) {
        db = mongoose.connect('mongodb://localhost/test');
        createCooperative.call(this, 'test1');
        createCooperative.call(this, 'test2');
        done();
    });

    after(function(done) {
        Cooperative.remove({}, function() {});
        mongoose.connection.close();
        done();
    });

    it('findAll should return all cooperatives', function(done) {
        CooperativesRepository.findAll(ACCOUNT_ID, function(cooperatives) {
            assert.equal(2, cooperatives.length);
            done();
        });
    });

    it('findById should return a cooperative', function(done) {
        CooperativesRepository.findById(ACCOUNT_ID, this.cooperativeId, function(cooperatives) {
            assert.equal(1, cooperatives.length);
            done();
        }.bind(this));
    });

    it('Update should edit a cooperative', function(done) {
        var coop = {
            name: 'testupdate',
            code: 'testupdate',
            email: 'testupdate@test.com'
        };
        CooperativesRepository.update(coop, this.cooperativeId, function() {
            CooperativesRepository.findById(ACCOUNT_ID, this.cooperativeId, function(cooperatives) {
                assert.equal(1, cooperatives.length);
                assert.equal('testupdate', cooperatives[0].name);
                done();
            }.bind(this));
        }.bind(this));
    });

    it('Delete should delete a cooperative', function(done) {
        CooperativesRepository.delete(this.cooperativeId);
        CooperativesRepository.findById(ACCOUNT_ID, this.cooperativeId, function(cooperatives) {
            assert.equal(0, cooperatives.length);
            done();
        }.bind(this));
    });
});