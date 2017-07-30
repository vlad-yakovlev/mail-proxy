'use strict';


const co = require('co');
const passport = require('passport');

const User = require('model/user');


module.exports = {
	noAuthBridge(req, res, next) {
		if (req.user) {
			let err = new Error('Forbidden');
			err.status = 403;
			return next(err);
		}
		
		next();
	},
	
	authBridge(req, res, next) {
		if ( ! req.user) {
			let err = new Error('Forbidden');
			err.status = 403;
			return next(err);
		}
		
		next();
	},
	
	
	login(req, res, next) {
		co(function*() {
			const user = yield User.findOne({
				login: req.body.login,
			});
			
			console.log(req.body.login, req.body.pass);
			
			if ( ! user) {
				res.json(['Пользователь не найден']);
				return;
			}
			if (user.password !== User.hash(req.body.pass)) {
				res.json(['Неверный пароль']);
				return;
			}
			
			yield new Promise((resolve, reject) => {
				req.login(user, err => {
					if (err) {
						return reject(err);
					}
					resolve();
				});
			});
			
			res.json([null]);
		}).catch(next);
	},
	
	logout(req, res, next) {
		req.logout();
		
		res.json([null]);
	},
};