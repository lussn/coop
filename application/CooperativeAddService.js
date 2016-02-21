var CooperativesRepository = require('../infrastructure/persistence/CooperativesRepository');
var Cooperative = require('../domain/cooperatives/Cooperative');

var CooperativeAddService = function CooperativeAddService() {
	this.save = function (cooperative, accountId) {
		var coop = new Cooperative({
			name: cooperative.name,
			code: cooperative.code,
			email: cooperative.email
		});
		coop.members.push(accountId);
		return CooperativesRepository.save(coop);
	}
};
module.exports = new CooperativeAddService();