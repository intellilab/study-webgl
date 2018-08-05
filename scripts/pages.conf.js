/**
 * For each entry, `key` is the chunk name,
 * `value.entry` is the webpack entry,
 * `value.html` is the options object passed to HtmlWebpackPlugin.
 */

module.exports = {
  index: {
    entry: './src/index',
    html: {
      title: 'WebGL',
    },
  },
  three: {
    entry: './src/three',
    html: {
      title: 'three.js',
      js: [
        'https://cdn.jsdelivr.net/npm/three@0.94.0/build/three.min.js',
      ],
    },
  },
};
