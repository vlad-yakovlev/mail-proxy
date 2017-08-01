'use strict';


const config = require('lib/config');
const logger = require('lib/logger');


module.exports = app => {
	const Router = require('urouter');
	
	
	logger.debug('Configuring router..');
	
	
	const
		index     = require('routes/index'),
		auth      = require('routes/auth'),
		dashboard = require('routes/dashboard');
	
	Router(app, $ => {
		// redirect to dashboard in method
		$.get('/').to(index.view);
		
		$.bridge('/auth', $ => {
			$.post('/login').to(auth.login);
			$.post('/logout').to(auth.logout);
		});
		
		$.bridge(auth.authBridge, $ => {
			$.bridge('/dashboard', $ => {
				$.get('').to(dashboard.view);
				
				$.bridge('/mail', $ => {
					$.get('/:id').to(dashboard.viewMail);
					$.post('/:id/accept').to(dashboard.acceptMail);
					$.post('/:id/reject').to(dashboard.rejectMail);
				});
				
				$.get('/attachment/:id').to(dashboard.getAttachment);
			});
		});
	}, err => {
		console.log(err);
		e.log.error(err);
	});
	
	Router(app, $ => {
		$.get('/').to(index.view);
	}, logger.catch);
	
	
	app.use((req, res, next) => {
		const err = new Error('Not Found');
		err.status = 404;
		next(err);
	});
	
	app.use((err, req, res, next) => {
		logger.catch(err);
		
		res.status(err.status || 500);
		res.render('error', {
			layout: false,
			status: err.status || 'n/a',
			error: err.message,
		});
	});
	
	
	logger.debug('Router configured');
};