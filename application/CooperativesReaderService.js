var CooperativesRepository = require('../infrastructure/persistence/CooperativesRepository');

var CooperativesReaderService = function AccountRegisterService() {
	this.findAll = function (accountId, callback) { 
		return CooperativesRepository.findAll(accountId, callback);
	}
};
module.exports = new CooperativesReaderService();