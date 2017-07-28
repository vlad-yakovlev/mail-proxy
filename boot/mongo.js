'use strict';


const config = require('lib/config');
const logger = require('lib/logger');


module.exports = () => {
	logger.debug('Configuring mongo..');
	
	
	const mongoose = require('mongoose');
	
	mongoose.Promise = global.Promise;
	mongoose.connect(`${config.get('mongo:url')}/${config.get('mongo:name')}`, {
		useMongoClient: true,
	});
	
	
	logger.debug('Mongo configured');
};