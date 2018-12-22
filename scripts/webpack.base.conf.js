const webpackUtil = require('webpack-util/webpack');
const { isProd, defaultOptions, combineConfig } = require('webpack-util/util');

// defaultOptions.hashedFilename = isProd;

const baseConfig = combineConfig({
  externals: {
    three: 'THREE',
  },
  devServer: {
    disableHostCheck: true,
  },
}, [
  webpackUtil.common(),
  webpackUtil.css(),
  webpackUtil.url(),
  webpackUtil.raw(),
  webpackUtil.svg(),
  webpackUtil.devServer(),
  // webpackUtil.sw(),
  process.env.RUN_ENV === 'analyze' && webpackUtil.analyze(),
]);

module.exports = baseConfig;
