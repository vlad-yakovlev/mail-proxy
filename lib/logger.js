'use strict';


const config = require('lib/config');


const winston = require('winston');
const morgan = require('morgan');


winston.level = config.get('logger:level');


function createLogger(level) {
	return (...args) => winston.log.apply(winston, [ level, new Date() ].concat(args));
}

exports.error = createLogger('error');
exports.warn  = createLogger('warn');
exports.info  = createLogger('info');
exports.debug = createLogger('debug');


exports.catch = err => {
	exports.error(err.message);
	exports.debug(err);
};


exports.express = morgan(':method :url :status');