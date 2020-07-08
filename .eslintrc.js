module.exports = {
  root: true,
  extends: [
    require.resolve('@gera2ld/plaid/eslint'),
    require.resolve('@gera2ld/plaid-common-react/eslint'),
  ],
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  rules: {
    'no-multi-spaces': 'off',
    'no-bitwise': 'off',

    // wait for https://github.com/benmosher/eslint-plugin-import/issues/1845
    'import/named': 'off',
    'import/export': 'off',
  },
};
