/* eslint global-require: 0, no-magic-numbers: 0 */
'use strict';

const path = require('path');
const marked = require('marked');
const webpack = require('webpack');
const reqPrism = require('prismjs');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// marked renderer hack
marked.Renderer.prototype.code = function renderCode(code, lang) {
  const out = this.options.highlight(code, lang);
  const classMap = this.options.langPrefix + lang;

  if (!lang) {
    return `<pre class="prettyprint">${out}</pre>`;
  }
  return `<pre class="prettyprint ${classMap}">${out}</pre>\n`;
};

/*eslint no-process-env:0, camelcase:0*/
const isProduction = (process.env.NODE_ENV || 'development') === 'production';
const devtool = process.env.NODE_ENV === 'test' ? 'inline-source-map' : 'source-map';
const dest = 'demo-build';
const absDest = root(dest);

const config = {
  // isProduction ? 'source-map' : 'evale',
  devtool,
  debug: false,

  verbose: false,
  displayErrorDetails: true,
  context: __dirname,
  stats: {
    colors: true,
    reasons: true
  },

  resolve: {
    cache: false,
    root: __dirname,
    extensions: ['', '.ts', '.js', '.json']
  },

  entry: {
    angular2: [
      // Angular 2 Deps
      'es6-shim',
      'es6-promise',
      'zone.js',
      'reflect-metadata',
      '@angular/common',
      '@angular/core'
    ],
    'angular2-bootstrap-demo': 'demo'
  },

  output: {
    path: absDest,
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js'
  },

  // our Development Server configs
  devServer: {
    inline: true,
    colors: true,
    historyApiFallback: true,
    contentBase: dest,
    //publicPath: dest,
    outputPath: dest,
    watchOptions: {aggregateTimeout: 300, poll: 1000}
  },

  markdownLoader: {
    langPrefix: 'language-',
    highlight(code, lang) {
      const language = !lang || lang === 'html' ? 'markup' : lang;
      const Prism = global.Prism || reqPrism;

      if (!Prism.languages[language]) {
        require(`prismjs/components/prism-${language}.js`);
      }
      return Prism.highlight(code, Prism.languages[language]);
    }
  },
  module: {
    loaders: [
      // support markdown
      {test: /\.md$/, loader: 'html!markdown'},
      // Support for *.json files.
      {test: /\.json$/, loader: 'json'},
      // Support for CSS as raw text
      {test: /\.css$/, loader: 'raw'},
      // support for .html as raw text
      {test: /\.html$/, loader: 'raw'},
      // Support for .ts files.
      {
        test: /\.ts$/,
        loader: 'ts',
        query: {
          compilerOptions: {
            removeComments: true,
            noEmitHelpers: false
          }
        },
        exclude: [/\.(spec|e2e)\.ts$/]
      }
    ],
    noParse: [
      /rtts_assert\/src\/rtts_assert/,
      /reflect-metadata/,
      /zone\.js\/dist\/zone-microtask/
    ]
  },

  htmlLoader: {
    minimize: true,
    removeAttributeQuotes: false,
    caseSensitive: true,
    customAttrSurround: [
      [/#/, /(?:)/],
      [/\*/, /(?:)/],
      [/\[?\(?/, /(?:)/]
    ],
    customAttrAssign: [/\)?\]?=/]
  },

  plugins: [
    //new Clean([dest]),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'angular2',
      minChunks: Infinity,
      filename: 'angular2.js'
    }),
    // static assets
    new CopyWebpackPlugin([{from: 'demo/favicon.ico', to: 'favicon.ico'}]),
    new CopyWebpackPlugin([{from: 'demo/assets', to: 'assets'}]),
    // generating html
    new HtmlWebpackPlugin({template: 'demo/index.html'}),
    new HtmlWebpackPlugin({
      template: 'demo/index-bs4.html',
      filename: 'index-bs4.html'
    })
  ],
  pushPlugins() {
    if (!isProduction) {
      return;
    }
    const plugins = [
      //production only
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,

        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },

        compress: {
          screw_ie8: true
        },

        comments: false
      }),
      new CompressionPlugin({
        regExp: /\.css$|\.html$|\.js$|\.map$/,
        threshold: 2 * 1024
      })
    ];

    this
      .plugins
      .push
      .apply(plugins);
  }
};

config.pushPlugins();

module.exports = config;

function root(partialPath) {
  return path.join(__dirname, partialPath);
}