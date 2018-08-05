const { resolve } = require('../util');

module.exports = config => {
  config.module = {
    ...config.module,
  };
  config.module.rules = [
    ...config.module.rules || [],
    {
      test: /\.(vert|frag)$/,
      use: 'raw-loader',
      include: [resolve('src')],
    },
  ];
};
