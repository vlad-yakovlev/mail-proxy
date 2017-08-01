'use strict';


const config = require('lib/config');
const logger = require('lib/logger');


module.exports = () => {
	const co = require('co');
	
	const SMTPServer = require('smtp-server').SMTPServer;
	
	const Mail = require('model/mail');
	const SmtpUser = require('model/smtp-user');
	
	
	logger.debug('Configuring SMTP server..');
	
	
	const smtp = new SMTPServer({
		disabledCommands: ['STARTTLS'],
		
		onAuth(auth, session, callback) {
			co(function*() {
				let user = yield SmtpUser.findOne({
					login: auth.username,
					password: SmtpUser.hash(auth.password),
				});
				
				if ( ! user) {
					throw new Error('Invalid username or password');
				}
				
				return user;
			})
				.then(user => {
					logger.debug(`Auth as ${auth.username} success`);
					
					callback(null, {
						user,
					});
				})
				.catch(err => {
					logger.debug(`Auth as ${auth.username} error`);
					logger.catch(err);
					
					callback(err);
				});
		},
		
		onData(stream, session, callback) {
			co(function*() {
				logger.debug(`Receiving mail from ${session.user.login}..`);
				
				yield Mail.receive(session.user, stream);
				
				logger.debug(`Mail from ${session.user.login} received`);
			})
				.then(callback)
				.catch(logger.catch);
		},
	});
	
	
	logger.debug('SMTP server configured');
	
	
	return smtp;
};