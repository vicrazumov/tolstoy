const path = require('path');

module.exports = {
  entry: './src/индекс.лн',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.лн$/,
        use: [
          {
            loader: path.resolve('./webpack-plugins/tolstoy.js'),
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