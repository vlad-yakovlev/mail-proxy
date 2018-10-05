import * as webpack from 'webpack';
import merge from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';
import baseConfig, { resolve } from './base';

const config: webpack.Configuration = merge(baseConfig, {
    entry: resolve('api'),
    externals: [
        nodeExternals({
            modulesDir: resolve('node_modules'),
        }),
    ],
    module: {
        rules: [
            {
                loader: 'awesome-typescript-loader',
                options: {
                    configFileName: resolve('api/tsconfig.json'),
                },
                test: /\.ts$/,
            },
        ],
    },
    output: {
        path: resolve('build/api'),
    },
    target: 'node',
});

export default config;
