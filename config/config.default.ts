'use strict';
import * as path from 'path';

module.exports =  () => {
    return {
        keys: 'secret',
        react: {
            assetPath: '/build',
        },

        view: {
            defaultExtension: '.tsx',
        },
        router: {
            entry: 'index',
            exts: [ '.tsx' ],
        },
        isomorphic: {
            babel: false,
        },
        webpack: {
            // your webpack config file
            custom: {
                configPath: path.resolve(__dirname, './webpack.config.ts'),
            },
            resolve: {
                extensions: [ '.json', '.js', '.jsx', '.ts', '.tsx', '.less' ],
                alias: {
                    client: path.join(__dirname, '../client'),
                    theme: path.join(__dirname, '../client/theme'),
                },
            },
        },
        alinode: {
          server: 'wss://agentserver.node.aliyun.com:8080',
          appid: 75806,
          secret: 'd5a9e7685155fa5982229bf84d2a14af78ab0e61',
          logdir: '/logs/',
        },
    };
};
