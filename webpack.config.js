const path = require('path')

module.exports = {
  entry: './src/индекс.лн',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.лн$/,
        use: [
          {
            loader: path.resolve('./webpack-plugins/tolstoy.js'),
            options: {
              test: 'this is test',
            },
          }
        ]
      }
    ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
}
