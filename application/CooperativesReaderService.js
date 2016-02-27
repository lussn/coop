var CooperativesRepository = require('../infrastructure/persistence/CooperativesRepository');

var CooperativesReaderService = function AccountRegisterService() {
	this.findAll = function (accountId, callback) {
		return CooperativesRepository.findAll(accountId, callback);
	}

	this.findById = function (accountId, cooperativeId, callback) {
		return CooperativesRepository.findById(accountId, cooperativeId, callback);
	}
};
module.exports = new CooperativesReaderService();
