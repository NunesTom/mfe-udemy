const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/dashboard/latest/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'dashboard',
      exposes: {
        './DashboardApp': './src/bootstrap',
      },
      filename: 'remoteEntry.js',
      shared: packageJson.dependencies,
    }),
  ]
};

module.exports = merge(commonConfig, prodConfig);