'use strict';


const config = require('lib/config');
const logger = require('lib/logger');


module.exports = app => {
	const co = require('co');
	const path = require('path');
	
	
	logger.debug('Configuring view..');
	
	
	app.use((req, res, next) => {
		co(function*() {
			// Доступ к библиотеке форматирования даты
			res.locals.moment = require('moment');
			
			// Доступ к конфигу из шаблона
			res.locals.config = config;
			
			// Доступ к пользователю из шаблона
			res.locals.user = req.user;
			
			// Версия проекта, для подключения ресурсов
			res.locals.version = (yield require('git-rev-promises').short()) || `date_${Date.now()}`;
			
			next();
		});
	});
	
	app.set('views', path.join(process.cwd(), 'views'));
	app.set('view engine', 'ejs');
	app.use(require('express-ejs-layouts'));
	app.set('layout', 'layout');
	
	
	logger.debug('View configured');
};