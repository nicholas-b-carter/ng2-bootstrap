'use strict';
/* eslint-disable */
/**
 * @author: @AngularClass
 */
let conf;
// Look in ./config folder for webpack.dev.js
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    conf = require('./config/webpack.prod');
    break;
  case 'test':
  case 'testing':
    conf = require('./config/webpack.test');
    break;
  case 'dev':
  case 'development':
  default:
    conf = require('./config/webpack.dev');
}

const marked = require('marked');
// marked renderer hack
marked.Renderer.prototype.code = function renderCode(code, lang) {
  if (!lang) {
    return `<pre class="prettyprint">${code}</pre>`;
  }
  return `<pre class="prettyprint lang-${lang}">${code}</pre>`;
};

module.exports = conf;
