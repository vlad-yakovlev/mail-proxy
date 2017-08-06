'use strict';


const config = require('lib/config');
const logger = require('lib/logger');


module.exports = app => {
	const co = require('co');
	const cookieParser = require('cookie-parser');
	const session = require('express-session');
	const passport = require('passport');
	const mongoose = require('mongoose');
	const MongoStore = require('connect-mongo')(session);
	
	const User = require('model/user');
	
	
	logger.debug('Configuring passport..');
	
	
	app.use(cookieParser());
	
	app.use(session({
		secret: config.get('passport:secret'),
		cookie:{
			maxAge: 30 * 24 * 3600 * 1000, // 30 days
		},
		resave: true,
		saveUninitialized: true,
		store: new MongoStore({
			mongooseConnection: mongoose.connection,
		}),
	}));
	
	app.use(passport.initialize());
	app.use(passport.session());
	
	
	passport.serializeUser((user, done) => {
		done(null, user._id);
	});
	
	passport.deserializeUser((id, done) => {
		co(function*() {
			const user = yield User.findById(id);
			if ( ! user) {
				throw new Error('User not found');
			}
			
			done(null, user);
		}).catch(done);
	});
	
	
	logger.debug('Passport configured');
};