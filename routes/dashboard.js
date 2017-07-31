'use strict';


const co = require('co');


const Mail = require('model/mail');


module.exports = {
	view(req, res, next) {
		co(function*() {
			const list = yield Mail.find({
				status: 'new',
			}).exec();
			
			res.render('dashboard', {
				list,
			});
		}).catch(next);
	},
};