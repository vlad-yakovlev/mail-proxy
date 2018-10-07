import bodyParser from 'body-parser';
import express from 'express';
import expressBunyanLogger from 'express-bunyan-logger';
import config from '../config';
import logger from '../libs/logger';
import routes from '../routes';

const app: express.Application = express();

app.use(expressBunyanLogger({ logger }));
app.use(bodyParser.json());
app.use(routes);

app.listen(config.get('api_port'));

logger.info(`API listening on port ${config.get('api_port')}`);

export default app;
