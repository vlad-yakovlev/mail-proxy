'use strict';


const config = require('lib/config');
const logger = require('lib/logger');


module.exports = () => {
	const path = require('path');
	
	const express = require('express');
	const bodyParser = require('body-parser');
	
	
	logger.debug('Configuring express..');
	
	
	const app = express();
	
	app.use(logger.express);
	
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: false,
	}));
	
	const staticPath = path.join(process.cwd(), 'public');
	app.use(express.static(staticPath));
	
	
	logger.debug('Express configured');
	
	
	return app;
};