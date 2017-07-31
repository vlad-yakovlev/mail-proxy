'use strict';


const config = require('lib/config');
const logger = require('lib/logger');

const co = require('co');
const mongoose = require('mongoose');
const mailParser = require('mailparser').simpleParser;

const Attachment = require('model/attachment');


let Mail;
const MailSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.ObjectId,
		required: true,
	},
	status: {
		type: String,
		enum: ['new', 'accepted', 'rejected'],
		default: 'new',
	},
	
	from: {
		type: String,
	},
	to: {
		type: String,
	},
	cc: {
		type: String,
	},
	bcc: {
		type: String,
	},
	replyTo: {
		type: String,
	},
	
	date: {
		type: Date,
	},
	
	subject: {
		type: String,
	},
	html: {
		type: String,
	},
	text: {
		type: String,
	},
	
	attachments: {
		type: [mongoose.Schema.ObjectId],
		default: [],
	},
});


MailSchema.statics.receive = function (user, stream) {
	return co(function*() {
		const mailRaw = yield mailParser(stream);
		
		
		const mail = new Mail({
			userId: user._id,
			
			from: mailRaw.from.text,
			to: mailRaw.to.text,
			date: mailRaw.date,
			
			subject: mailRaw.subject,
			html: mailRaw.html,
			text: mailRaw.text,
		});
		
		if (mailRaw.cc) {
			mail.cc = mailRaw.cc.text;
		}
		if (mailRaw.bcc) {
			mail.bcc = mailRaw.bcc.text;
		}
		if (mailRaw.replyTo) {
			mail.replyTo = mailRaw.replyTo.text;
		}
		
		
		const attachments = yield Promise.all(mailRaw.attachments.map(Attachment.receive));
		
		mail.attachments = attachments.map(attachment => attachment._id);
		
		
		yield mail.save();
		
		return mail;
	});
};


Mail = mongoose.model('Mail', MailSchema);

module.exports = Mail;