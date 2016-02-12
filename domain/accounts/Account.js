var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: {
    	type: String,
    	lowercase: true,
    	required: true
  	},
    password: String,
  	email: {
    	type: String,
    	lowercase: true,
    	required: true
  	},
  	role: {
    	type: String,
    	enum: ['editor',  'admin'],
    	default: 'editor'
  	}
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);