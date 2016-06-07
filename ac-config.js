'use strict';
// todo: in common HtmlWebpackPlugin && chunks
module.exports = {
  // metadata
  title: 'Angular2 Webpack Starter by @gdi2290 from @AngularClass',
  baseUrl: '/',
  // root folder name
  root: 'demo',
  // webpack entry
  entry: {
    polyfills: './demo/polyfills.ts',
    vendor: './demo/vendor.ts',
    main: './demo/index.ts'
  },
  output: {
    path: 'demo-build'
  },

  // webpack alias
  alias: {},
  htmlExclude: ['demo/index.html', 'demo/index-bs4.html'],
  copy: [
    {from: 'demo/favicon.ico', to: 'favicon.ico'},
    {from: 'demo/assets', to: 'assets'}
  ]
};
