var Cooperative = require('../../domain/cooperatives/Cooperative');
var CooperativesRepository = function CooperativesRepository() {
	this.findAll = function (accountId, callback) {
		return Cooperative.find({ members: accountId }).exec(function(err, cooperatives){
			callback(cooperatives);
		});
	}

	this.save = function(coop) {
		coop.save();
	}
};
module.exports = new CooperativesRepository();