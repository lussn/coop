var express = require('express');

var AuthValidator = function AuthValidator() {
	this.validateUser = function (req, res, next) {
	    if (req.user) {
	        next();
	    } else {
	        res.redirect('/login');
	    }
	}

	this.validateApiUser = function (req, res, next) {
	    if (req.user) {
	        next();
	    } else {
	        res.status(401).json({message: 'Invalid API user'}); // TODO: status codes and messages
	    }
	}
};
module.exports = new AuthValidator();