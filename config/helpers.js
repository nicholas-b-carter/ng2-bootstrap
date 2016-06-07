/* eslint no-console:0 */
/**
 * @author: @AngularClass
 */
'use strict';
const path = require('path');

// Helper functions
const ROOT = path.resolve(__dirname, '..');

console.log('root directory:', `${root()}\n`);

function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

function root(...args) {
  return path.join(...[ROOT].concat(args));
}


exports.hasProcessFlag = hasProcessFlag;
exports.root = root;
