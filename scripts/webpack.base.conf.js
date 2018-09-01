const baseConfig = [
  require('./webpack/common')({
    style: {
      fallback: 'style-loader',
    },
  }),
  require('./webpack/url')(),
  require('./webpack/raw')(),
  require('./webpack/svg')(),
  // require('./webpack/sw')(),
].reduce(
  (config, apply) => (apply && apply(config) || config),
  {
    externals: {
      three: 'THREE',
    },
  },
);

module.exports = baseConfig;
