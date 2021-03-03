/**
 * For each entry, `key` is the chunk name, `value` has following properties:
 * - value.entry: webpack entry.
 * - value.html: options object passed to HtmlWebpackPlugin.
 * - value.html.inlineSource: if true, JS and CSS files will be inlined in HTML.
 */
const threeVersion = require('three/package.json').version;

exports.pages = {
  index: {
    html: {
      title: 'WebGL',
      js: [
        `https://cdn.jsdelivr.net/npm/three@${threeVersion}/build/three.min.js`,
      ],
    },
  },
};

exports.global = {
  externals: {
    three: 'THREE',
  },
  hashedFilename: true,
  htmlOptions: {
    meta: {},
  },
  devServer: {
    disableHostCheck: true,
  },
};
