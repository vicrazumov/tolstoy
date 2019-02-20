const path = require('path');
const ExamplePlugin = require('./webpack-plugins/example')

module.exports = {
  entry: './src/индекс.лн',
  mode: 'development',
  // plugins: [new ExamplePlugin({ options: true })],
  module: {
    rules: [
      {
        test: /\.лн$/,
        use: [
          {
            loader: path.resolve('./webpack-plugins/loader.js'),
            // options: {/* ... */}
          }
        ]
      }
    ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};