/**
 * @author: @AngularClass
 */
'use strict';

// Look in ./config for karma.conf.js
const conf = Object.assign({}, require('./ac-config'), {src: 'components'});

module.exports = require('./config/karma.conf.js')(conf);
