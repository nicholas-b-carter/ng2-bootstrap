/* eslint no-process-env: 0, global-require:0 */
/**
 * @author: @AngularClass
 */
'use strict';

// Look in ./config folder for webpack.dev.js
const conf = getWebpackConfig(process.env.NODE_ENV, require('./ac-config'));

// marked renderer hack
const marked = require('marked');

marked.Renderer.prototype.code = function renderCode(code, lang) {
  if (!lang) {
    return `<pre class="prettyprint" ngNonBindable>${code}</pre>`;
  }
  return `<pre class="prettyprint lang-${lang}" ngNonBindable>${code}</pre>`;
};

module.exports = conf;

function getWebpackConfig(env, config) {
  switch (env) {
  case 'prod':
  case 'production':
    return require('ng2-webpack-config/config/webpack.prod')(config);
  case 'test':
  case 'testing':
    return require('ng2-webpack-config/config/webpack.test')(config);
  case 'dev':
  case 'development':
  default:
    return require('ng2-webpack-config/config/webpack.dev')(config);
  }
}
