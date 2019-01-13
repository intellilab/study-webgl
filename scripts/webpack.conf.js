const { modifyWebpackConfig } = require('@gera2ld/plaid/util');

module.exports = modifyWebpackConfig(async (config) => {
  config.externals = {
    three: 'THREE',
  };
});
