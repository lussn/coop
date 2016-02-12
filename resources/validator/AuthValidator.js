var express = require('express');

var AuthValidator = function AuthValidator() {
	this.validateUser = function (req, res, next) {
	    if (req.user) {
	        next();
	    } else {
	        res.redirect('/login');
	    }
	}
};
module.exports = new AuthValidator();