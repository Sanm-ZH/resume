const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    publicPath: '',
    filename: '[name].js',
  },
  devServer: {
    port: 2333
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
        loader: 'base64-inline-loader',
      },
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      filename:'index.html',
      template:'./src/index.html',
      minify:{//压缩html
          collapseWhitespace:true,
          removeComments:true
      }
    }),
  ]
}