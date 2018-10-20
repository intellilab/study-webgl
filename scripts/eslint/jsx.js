module.exports = {
  extends: [
    'airbnb-base/rules/strict',
    'airbnb/rules/react',
  ],
  settings: {
    react: {
      pragma: 'h',
    },
  },
  rules: {
    'react/jsx-filename-extension': 'off',
  },
};
