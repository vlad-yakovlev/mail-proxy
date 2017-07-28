'use strict';


const config = require('nconf');

config.file({
	file: 'conf/config.json',
});


module.exports = config;