'use strict';


const config = require('lib/config');
const logger = require('lib/logger');

const co = require('co');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const textToHtml = require('lib/text-to-html');
const urlencode = require('urlencode');


const SmtpUser = require('model/smtp-user');
const Mail = require('model/mail');
const Attachment = require('model/attachment');


module.exports = {
	view(req, res, next) {
		co(function*() {
			const list = yield Mail.find({
				status: 'new',
			}).exec();
			
			res.render('dashboard', {
				list,
				mail: null,
			});
		}).catch(next);
	},
	
	
	viewMail(req, res, next) {
		co(function*() {
			const list = yield Mail.find({
				status: 'new',
			}).exec();
			
			
			const mail = yield Mail.findOne({
				_id: req.params.id,
			});
			
			mail._user = yield SmtpUser.findOne({
				_id: mail.userId,
			});
			
			mail._attachments = yield Attachment.find({
				_id: {
					$in: mail.attachments,
				},
			});
			
			mail._preview = textToHtml(mail.text);
			
			
			res.render('dashboard', {
				list,
				mail,
			});
		}).catch(next);
	},
	
	viewHtml(req, res, next) {
		co(function*() {
			const mail = yield Mail.findOne({
				_id: req.params.id,
			});
			
			
			res.render('html', {
				layout: false,
				html: mail.html,
			});
		}).catch(next);
	},
	
	acceptMail(req, res, next) {
		co(function*() {
			const mail = yield Mail.findOne({
				_id: req.params.id,
			});
			
			mail._attachments = yield Attachment.find({
				_id: {
					$in: mail.attachments,
				},
			});
			
			
			const transporter = nodemailer.createTransport(config.get('transport'));
			
			const message = {
				from: mail.from,
				to: mail.to,
				cc: mail.cc,
				bcc: mail.bcc,
				replyTo: mail.replyTo,
				
				date: mail.date,
				
				subject: mail.subject,
				html: mail.html,
				text: mail.text,
				
				attachments: mail._attachments.map(attachment => ({
					filename: attachment.name,
					path: path.join(process.cwd(), 'attachments', attachment.path),
				})),
			};
			
			yield new Promise((resolve, reject) => {
				transporter.sendMail(message, (err, info) => {
					if (err) {
						return reject(err);
					}
					
					resolve(info);
				});
			});
			
			
			mail.status = 'accepted';
			
			mail.save();
			
			
			res.json([null]);
		}).catch(next);
	},
	
	rejectMail(req, res, next) {
		co(function*() {
			const mail = yield Mail.findOne({
				_id: req.params.id,
			});
			
			
			mail.status = 'rejected';
			
			mail.save();
			
			
			res.json([null]);
		}).catch(next);
	},
	
	
	getAttachment(req, res, next) {
		co(function*() {
			const attachment = yield Attachment.findOne({
				_id: req.params.id,
			});
			
			
			const fileName = attachment.name;
			const filePath = path.join(process.cwd(), 'attachments', attachment.path);
			
			res.setHeader('Content-type', 'application/octet-stream');
			res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${urlencode(fileName)}`);
			
			fs.createReadStream(filePath).pipe(res);
		}).catch(next);
	},
};