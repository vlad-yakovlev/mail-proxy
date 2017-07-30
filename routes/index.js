'use strict';


const config = require('lib/config');
const logger = require('lib/logger');


module.exports = {
	view(req, res, next) {
		if (req.user) {
			res.redirect(303, '/dashboard');
		} else {
			res.render('index');
		}
	}
};