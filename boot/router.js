'use strict';


const config = require('lib/config');
const logger = require('lib/logger');


module.exports = app => {
	const Router = require('urouter');
	
	
	logger.debug('Configuring router..');
	
	
	const index = require('routes/index');
	
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