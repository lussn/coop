var CooperativesRepository = require('../infrastructure/persistence/CooperativesRepository');

var CooperativesReaderService = function AccountRegisterService() {
	this.findAll = function (accountId) { 
		return CooperativesRepository.findAll(accountId);
	}
};
module.exports = new CooperativesReaderService();