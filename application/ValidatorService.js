var ValidatorService = function ValidatorService() {
    this.validateUsername = function (username) {
        if(username.length < 5) {
            throw new Error('Sorry. Username with 5 characters min. Try again.');
        }
    }

    this.validateEmail = function (email) {
        var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if(email === '' || !emailRegex.test(email)) {
            throw new Error('Sorry. The email is not valid. Try again.');
        }
    }

    this.validatePassword = function (password1, password2) {
        if(password1.length < 5) {
            throw new Error('Sorry. Password with 5 characters min. Try again.');
        }
        if(password1 !== password2) {
            throw new Error('Sorry. Passwords don\'t match. Try again.');
        }
    }
};
module.exports = new ValidatorService();
