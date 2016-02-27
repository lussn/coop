var CooperativesRepository = require('../infrastructure/persistence/CooperativesRepository');
var Cooperative = require('../domain/cooperatives/Cooperative');
var ValidatorService = require('../application/ValidatorService');

var _validateCooperativeValues = function (cooperative) {
    ValidatorService.validateNotBlank(cooperative.name);
    ValidatorService.validateNotBlank(cooperative.code);
    ValidatorService.validateEmail(cooperative.email);
};

var CooperativeRegisterService = function CooperativeRegisterService() {
    this.save = function (cooperative, accountId) {
        _validateCooperativeValues(cooperative);
        var coop = new Cooperative({
            name: cooperative.name,
            code: cooperative.code,
            email: cooperative.email
        });
        coop.members.push(accountId);
        return CooperativesRepository.save(coop);
    },
    this.update = function (cooperative, cooperativeId, callback) {
        _validateCooperativeValues(cooperative);
        return CooperativesRepository.update(cooperative, cooperativeId, callback);
    }
};
module.exports = new CooperativeRegisterService();
