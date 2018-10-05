import path from 'path';
import webpack from 'webpack';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export function resolve(...args: string[]): string {
    return path.resolve(__dirname, '..', ...args);
}

export function getMode(): 'development' | 'production' {
    switch (process.env.NODE_ENV) {
        case 'development':
            return 'development';

        case 'production':
            return 'production';

        default:
            return 'production';
    }
}

const config: webpack.Configuration = {
    devtool: 'source-map',
    mode: getMode(),
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
    ],
    resolve: {
        extensions: ['.ts', '.js'],
    },
};

export default config;
