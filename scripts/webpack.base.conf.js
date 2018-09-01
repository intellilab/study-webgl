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
  process.env.RUN_ENV === 'analyze' && require('./webpack/analyze')(),
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
