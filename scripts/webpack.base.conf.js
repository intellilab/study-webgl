const webpackUtil = require('webpack-util/webpack');
// const { isProd, defaultOptions } = require('webpack-util/util');

// defaultOptions.hashedFilename = isProd;

const baseConfig = [
  webpackUtil.common(),
  webpackUtil.css(),
  webpackUtil.url(),
  webpackUtil.raw(),
  webpackUtil.svg(),
  webpackUtil.devServer(),
  // webpackUtil.sw(),
  process.env.RUN_ENV === 'analyze' && webpackUtil.analyze(),
]
.filter(Boolean)
.reduce(
  (config, apply) => (apply && apply(config) || config),
  {
    externals: {
      three: 'THREE',
    },
  },
);

module.exports = baseConfig;
