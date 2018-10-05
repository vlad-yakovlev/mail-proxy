import Config from '../libs/config';
import defaultConfig from './default.json';
import developmentConfig from './development.json';
import productionConfig from './production.json';

interface Schema {
    api_port: number;
    mongo_url: string;
    smtp_port: number;
}

const envSettings: Partial<Schema> = {};

if (process.env.API_PORT) {
    envSettings.api_port = Number(process.env.API_PORT);
}

if (process.env.MONGO_URL) {
    envSettings.mongo_url = String(process.env.MONGO_URL);
}

if (process.env.SMTP_PORT) {
    envSettings.smtp_port = Number(process.env.SMTP_PORT);
}

const config: Config<Schema> = new Config({
    ...defaultConfig,
    ...(process.env.NODE_ENV === 'development' ? developmentConfig : {}),
    ...(process.env.NODE_ENV === 'production' ? productionConfig : {}),
    ...envSettings,
});

export default config;
