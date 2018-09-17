'use strict';
import * as path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';

/* tslint:disable */
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const cssnano = require('cssnano');
const postcssOpts = {
  ident: 'postcss',
  plugins: () => [
    autoprefixer({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
    }),
    pxtorem({ rootValue: 75, propWhiteList: [] })
  ],
  cssnano
};

module.exports = (app, defaultConfig, dev) => {
    if (app && dev) {
        defaultConfig.plugins.push(
            new webpack.DefinePlugin({
                __ENV__: JSON.stringify('daily'),
                __CLIENT__: true,
                __SERVER__: false,
                __DEVELOPMENT__: true,
                __DEVTOOLS__: true,
                __DAILY__: true,
            })
        );
      defaultConfig.output = {
        path: path.join(__dirname, '../app/build'),
        filename: '[name].js',
        publicPath: '/build/',
        chunkFilename: '[name].[chunkhash:8].chunk.js'
      };
      defaultConfig.devtool = 'source-map';
    } else {
        defaultConfig.plugins.push(
            new webpack.DefinePlugin({
                __ENV__: JSON.stringify('prod'),
                __CLIENT__: true,
                __SERVER__: false,
                __DEVELOPMENT__: false,
                __DEVTOOLS__: false,
                __DAILY___: false,
                'process.env': {
                    NODE_ENV: JSON.stringify('production'),
                },
            }),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            // new BundleAnalyzerPlugin()
        );
        defaultConfig.plugins.push(
          new ExtractTextPlugin('[name].[contenthash].css')
        );
        defaultConfig.plugins.push(
          new ManifestPlugin({
            fileName: 'manifest.json',
            manifestVariable: "webpackManifest",
            writeToFileEmit: true,
          }),
        );
      defaultConfig.output = {
        path: path.join(__dirname, '../app/build'),
        filename: '[name].[chunkhash:8].js',
        publicPath: '/build/',
        chunkFilename: '[name].[chunkhash:8].chunk.js'
      };
    }

    const tsLoader = {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                targets: {
                                    browsers: ['>1%', 'last 4 versions', 'not ie < 9'],
                                },
                                useBuiltIns: 'entry',
                                // Do not transform modules to CJS
                                modules: false,
                            },
                        ],
                        '@babel/typescript',
                        [ '@babel/preset-stage-2', { decoratorsLegacy: true } ],
                        [
                            '@babel/preset-react',
                            {
                                development: dev,
                                useBuiltIns: true,
                            },
                        ],
                    ],

                    plugins: [
                        [
                            '@babel/transform-runtime',
                            {
                                polyfill: false,
                                regenerator: true,
                            },
                        ],
                      ['@babel/plugin-proposal-decorators',{ "legacy": true}],
                      ['@babel/plugin-proposal-class-properties', {"loose": true}],
                    ],
                    env: {
                        development: {
                            plugins: [ 'module:react-hot-loader/babel' ],
                        },
                    },
                    cacheDirectory: dev,
                    compact: !dev,
                    highlightCode: true,
                },
            },
        ],
    };

    defaultConfig.module.rules[0].use = {
        loader: 'babel-loader',
        options: {
            babelrc: false,
            presets: [
                [
                    '@babel/preset-env',
                    {
                        targets: {
                            browsers: ['>1%', 'last 4 versions', 'not ie < 9'],
                        },
                        useBuiltIns: 'entry',
                        // Do not transform modules to CJS
                        modules: false,
                    },
                ],
                '@babel/preset-stage-2',
                [
                    '@babel/preset-react',
                    {
                        development: dev,
                        useBuiltIns: true,
                    },
                ],
            ],
            plugins: [],
            env: {
                development: {
                    plugins: ['module:react-hot-loader/babel'],
                },
            },
            cacheDirectory: dev,
            compact: !dev,
            highlightCode: true,
        },
    };

    defaultConfig.module.rules.push(tsLoader);
    // px转换rem
    defaultConfig.module.rules[5].use[3] = {
      loader: 'postcss-loader',
      options: postcssOpts
    };
    defaultConfig.module.rules[6].use[3] = {
      loader: 'postcss-loader',
      options: postcssOpts
    };

    return defaultConfig;
};
/* tslint:enable */
