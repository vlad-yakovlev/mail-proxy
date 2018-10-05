import * as webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig, { resolve } from './base';

const config: webpack.Configuration = merge(baseConfig, {
    entry: resolve('www'),
    module: {
        rules: [
            {
                loader: 'awesome-typescript-loader',
                options: {
                    configFileName: resolve('www/tsconfig.json'),
                },
                test: /\.ts$/,
            },
        ],
    },
    output: {
        path: resolve('build/www'),
    },
});

export default config;
