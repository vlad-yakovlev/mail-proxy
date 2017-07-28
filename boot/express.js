'use strict';


const config = require('lib/config');
const logger = require('lib/logger');


module.exports = app => {
	const bodyParser = require('body-parser');
	
	
	logger.debug('Configuring express..');
	
	
	app.use(logger.express);
	
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: false,
	}));
	
	
	logger.debug('Express configured');
};