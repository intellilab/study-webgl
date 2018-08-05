const baseConfig = [
  require('./webpack/common'),
  require('./webpack/url'),
  // require('./webpack/svg'),
  // require('./webpack/inline'),
  require('./webpack/raw'),
].reduce(
  (config, apply) => (apply && apply(config) || config),
  {},
);

module.exports = baseConfig;
