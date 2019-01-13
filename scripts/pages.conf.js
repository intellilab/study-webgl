/**
 * For each entry, `key` is the chunk name, `value` has following properties:
 * - value.entry: webpack entry.
 * - value.html: options object passed to HtmlWebpackPlugin.
 * - value.html.inlineSource: if true, JS and CSS files will be inlined in HTML.
 */

module.exports = {
  index: {
    html: {
      title: 'WebGL',
    },
  },
  three: {
    html: {
      title: 'Three',
      js: [
        'https://cdn.jsdelivr.net/npm/three/build/three.min.js',
      ],
    },
  },
};
