'use strict';


const config = require('lib/config');
const logger = require('lib/logger');

const mongoose = require('mongoose');
const crypto = require('crypto');


let SmtpUser;
const SmtpUserSchema = new mongoose.Schema({
	login: {
		type: String,
		unique: true,
		required: true,
	},
	name: {
		type: String,
		default: '',
	},
	password: {
		type: String,
		required: true,
	},
});


SmtpUserSchema.statics.hash = function (text) {
	return crypto.createHash('sha256').update(text).digest('base64');
};


SmtpUser = mongoose.model('SmtpUser', SmtpUserSchema);

module.exports = SmtpUser;