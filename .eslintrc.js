module.exports = {
  root: true,
  extends: [
    require.resolve('webpack-util/eslint'),
    require.resolve('./scripts/eslint/jsx'),
  ],
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  rules: {
    'no-multi-spaces': 'off',
    'no-bitwise': 'off',
  },
};
