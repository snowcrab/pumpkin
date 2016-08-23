"use strict";

const path = require('path');

const easyWebpack = require('@easy-webpack/core');
const generateConfig = easyWebpack.default;

const ENV = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() || 'development';

let config;

// base settings
const baseUrl = '/';
const rootDir = path.resolve();
const clientDir = path.resolve('Client');
const wwwrootDir = path.resolve('wwwroot');

const baseConfig = {
    entry: {
        app: [
            './Client/Scripts'
        ]
    },
    output: {
        path: `${wwwrootDir}/client`
    }
};

switch (ENV) {
    case 'production':
        config = generateConfig(
            baseConfig,
            require('@easy-webpack/config-env-production')({ compress: true }),
            require('@easy-webpack/config-html')(),
            require('@easy-webpack/config-css')({ filename: 'styles.css', allChunks: true, sourceMap: false }),
            require('@easy-webpack/config-uglify')({ debug: false })
        );
        break;

    default:
    case 'development':
        process.env.NODE_ENV = 'development';
        config = generateConfig(
            baseConfig,
            require('@easy-webpack/config-env-development')(),
            require('@easy-webpack/config-html')(),
            require('@easy-webpack/config-css')({ filename: 'styles.css', allChunks: true, sourceMap: false })
        );
        break;
}

module.exports = config;