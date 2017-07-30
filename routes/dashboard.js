'use strict';


const co = require('co');


module.exports = {
	view(req, res, next) {
		co(function*() {
			res.render('dashboard');
		}).catch(next);
	},
};