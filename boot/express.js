'use strict';


const config = require('lib/config');
const logger = require('lib/logger');


module.exports = () => {
	const express = require('express');
	const bodyParser = require('body-parser');
	
	
	logger.debug('Configuring express..');
	
	
	const app = express();
	
	app.use(logger.express);
	
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: false,
	}));
	
	
	logger.debug('Express configured');
	
	
	return app;
};