'use strict';


const mongoose = require('mongoose');
const crypto = require('crypto');


let User;
const UserModel = new mongoose.Schema({
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


UserModel.statics.hash = function (text) {
	return crypto.createHash('sha256').update(text).digest('base64');
};


User = mongoose.model('User', UserModel);

module.exports = User;