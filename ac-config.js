'use strict';
// todo: in common HtmlWebpackPlugin && chunks
module.exports = {
  // metadata
  title: 'Angular2 Webpack Starter by @gdi2290 from @AngularClass',
  baseUrl: '/',
  // root folder name
  src: 'demo',
  dist: 'demo-build',
  htmlIndexes: ['index.html', 'index-bs4.html'],
  // webpack entry
  entry: {
    polyfills: './demo/polyfills.ts',
    vendor: './demo/vendor.ts',
    main: './demo/index.ts'
  },
  commonChunks: {
    name: ['polyfills', 'vendor'].reverse()
  },
  // webpack alias
  alias: {},
  copy: [
    {from: 'demo/favicon.ico', to: 'favicon.ico'},
    {from: 'demo/assets', to: 'assets'}
  ]
};
