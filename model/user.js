'use strict';


const mongoose = require('mongoose');
const crypto = require('crypto');


const User = new mongoose.Schema({
	login: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});


User.statics.hash = function (text) {
	return crypto.createHash('sha256').update(text).digest('base64');
};


module.exports = mongoose.model('User', User);