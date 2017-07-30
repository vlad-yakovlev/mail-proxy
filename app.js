'use strict';


const config = require('lib/config');
const logger = require('lib/logger');


require('boot/mongo')();


const app = require('boot/express')();
require('boot/passport')(app);
require('boot/view')(app);
require('boot/router')(app);
app.listen(process.env.HTTP_PORT, () => logger.info('HTTP server started'));


const smtp = require('boot/smtp')();
smtp.listen(process.env.SMTP_PORT, () => logger.info('SMTP server started'));