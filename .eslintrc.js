module.exports = {
  root: true,
  extends: [
    require.resolve('@gera2ld/plaid/eslint'),
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
