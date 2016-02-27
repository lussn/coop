var Cooperative = require('../../domain/cooperatives/Cooperative');
var CooperativesRepository = function CooperativesRepository() {
	this.findAll = function (accountId, callback) {
		return Cooperative.find({ members: accountId }).exec(function(err, cooperatives){
			callback(cooperatives);
		});
	},

	this.findById = function (accountId, cooperativeId, callback) {
		return Cooperative.find({ _id: cooperativeId, members: accountId }).exec(function(err, cooperatives){
			callback(cooperatives);
		});
	},

	this.save = function(coop) {
		coop.save();
	},

	this.update = function(coop, cooperativeId, callback) {
		Cooperative.findOneAndUpdate({_id: cooperativeId}, coop, callback);
	}
};
module.exports = new CooperativesRepository();
