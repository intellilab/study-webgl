const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const base = require('./webpack.base.conf');
const pages = require('./pages.conf');
const { isProd } = require('./utils');
const INLINE = false && isProd;
const MINIFY = isProd && {
  collapseWhitespace: true,
  removeAttributeQuotes: true,
  removeComments: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
};
const defaultTemplateOptions = {
  inlineSource: '.(js|css)$',
  minify: MINIFY,
  template: 'scripts/template.html',
  meta: { viewport: 'width=device-width,initial-scale=1.0' },
  css: [],
  js: [],
};

const targets = module.exports = [];

const entries = Object.entries(pages)
.reduce((res, [key, { entry }]) => Object.assign(res, { [key]: entry }), {});
const htmlPlugins = Object.entries(pages)
.map(([key, { html }]) => {
  let options;
  if (html) {
    options = Object.assign({
      filename: `${key}.html`,
      chunks: [key],
    }, defaultTemplateOptions);
    if (typeof html === 'function') {
      options = html(options);
    } else {
      Object.assign(options, html);
    }
  }
  return options && new HtmlWebpackPlugin(options);
})
.filter(Boolean);

targets.push({
  ...base,
  entry: entries,
  plugins: [
    ...base.plugins,
    ...htmlPlugins,
    INLINE && new HtmlWebpackInlineSourcePlugin(),
  ].filter(Boolean),
});
