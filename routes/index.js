'use strict';


const config = require('lib/config');
const logger = require('lib/logger');


module.exports = {
	view(req, res, next) {
		res.render('index');
	}
};