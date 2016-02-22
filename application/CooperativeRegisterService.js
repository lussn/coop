var CooperativesRepository = require('../infrastructure/persistence/CooperativesRepository');
var Cooperative = require('../domain/cooperatives/Cooperative');

var CooperativeRegisterService = function CooperativeRegisterService() {
	this.save = function (cooperative, accountId) {
		var coop = new Cooperative({
			name: cooperative.name,
			code: cooperative.code,
			email: cooperative.email
		});
		coop.members.push(accountId);
		return CooperativesRepository.save(coop);
	},
	this.update = function (cooperative, cooperativeId, callback) {
		var coop = new Cooperative({
			name: cooperative.name,
			code: cooperative.code,
			email: cooperative.email
		});
		return CooperativesRepository.update(coop, cooperativeId, callback);
	}
};
module.exports = new CooperativeRegisterService();
