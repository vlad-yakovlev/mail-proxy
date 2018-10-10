import { MongoClient } from 'mongodb';
import config from '../config';
import logger from '../libs/logger';

const client: MongoClient = new MongoClient(config.get('mongo_url'));

client
    .connect()
    .then(() => {
        logger.info(`MongoDB connection established to ${config.get('mongo_url')}`);
    })
    .catch((error) => {
        logger.fatal(error);

        process.exit(1);
    });

export default client;
