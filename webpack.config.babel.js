import path from 'path';
import fs from 'fs';

require('dotenv').config();

const app = {
  title: 'BEKB Investment Simulator',
  short: 'BEKB Invest',
  description: 'A Webapp for the BEKB',
  colorbkg: '#cc0033',
  color: '#cc0033',
};

import { DefinePlugin } from 'webpack';

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import workboxPlugin from 'workbox-webpack-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest';

import TerserJSPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import glob from 'glob-all';

module.exports = (env, argv) => {
  const dirDist = path.resolve(__dirname, 'dist');
  const dirSrc = path.resolve(__dirname, 'src');
  const dev = argv.mode !== 'production';

  let serveHttps = false;
  if (process.env.SSL_KEY && process.env.SSL_CRT && process.env.SSL_PEM) {
    serveHttps = {
      key: fs.readFileSync(process.env.SSL_KEY),
      cert: fs.readFileSync(process.env.SSL_CRT),
      ca: fs.readFileSync(process.env.SSL_PEM),
    };
  }

  return {
    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    entry: {
      app: `${dirSrc}/index.js`,
    },
    devServer: {
      contentBase: dirDist,
      compress: true,
      port: process.env.PORT || 8080,
      https: serveHttps,
      hot: true,
      historyApiFallback: true,
    },
    output: {
      path: dirDist,
      filename: 'assets/[name]-[hash].js',
    },
    devtool: dev ? `cheap-module-eval-source-map` : undefined,
    plugins: [
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
      }),
      new MiniCssExtractPlugin({
        filename: dev ? 'assets/[name].css' : 'assets/[name].[hash].css',
        chunkFilename: dev
          ? 'assets/[name].[id].css'
          : 'assets/[name].[id].[hash].css',
      }),
      new CopyWebpackPlugin([
        {
          from: 'src/assets/static',
          to: 'assets/static',
        },
      ]),
      new HtmlWebpackPlugin({
        title: app.title,
        description: app.description,
        template: 'src/index.html',
        filename: './index.html',
        chunksSortMode: 'none',
        minify: dev
          ? false
          : {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
              useShortDoctype: true,
            },
      }),
      ...(!dev || process.env.GENERATE_SW === 'true' // only generate manifest and SW in prod build
        ? [
            new WebpackPwaManifest({
              name: app.title,
              short_name: app.short,
              description: app.description,
              theme_color: app.color,
              background_color: app.colorbkg,
              crossorigin: 'use-credentials',
              fingerprints: false,
              icons: [
                {
                  src: path.resolve(`${dirSrc}/assets/bekb-logo.png`),
                  sizes: [96, 128, 192, 256, 384, 512],
                  destination: path.join('assets', 'pwa-icon'),
                  ios: true,
                  purpose: 'maskable',
                },
              ],
            }),
            new workboxPlugin.InjectManifest({
              swSrc: './src/service-worker.js',
              include: [/\.html$/, /\.js$/, /\.css$/],
              maximumFileSizeToCacheInBytes: 5000000,
            }),
          ]
        : []),
      new DefinePlugin({
        IS_DEV: dev,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.svg$/,
          exclude: /node_modules/,
          loader: ['babel-loader', 'raw-loader'],
        },
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jpg|gif)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]',
          },
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: dev,
                //reloadAll: true,
              },
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('postcss-nested'),
                  require('autoprefixer'),
                ],
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@app': `${dirSrc}/app/`,
        '@utils': `${dirSrc}/utils/`,
      },
    },
  };
};
