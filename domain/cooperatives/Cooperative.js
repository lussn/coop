var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Cooperative = new Schema({
    name: String,
    code: String,
    email: String, //TODO: Validate email
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'Account'}]
});

module.exports = mongoose.model('Cooperative', Cooperative);