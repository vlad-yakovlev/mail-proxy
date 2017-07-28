'use strict';


const config = require('lib/config');
const logger = require('lib/logger');


const app = require('express')();

require('boot/mongo')();
require('boot/express')(app);
require('boot/passport')(app);
require('boot/view')(app);
require('boot/router')(app);


app.listen(process.env.PORT, () => logger.info('Server started'));