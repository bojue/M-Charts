const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/script/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
        "React": "react",
    }),
    new htmlWebpackPlugin({
        template: path.join(__dirname, './public/index.html'),
        filename:'index.html',
    })
  ],
  watch:true,
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 3000,
    hot:true,
    host:"localhost",
    historyApiFallback: true,
    compress: false,
    open:"Chrome",
    openPage:''
  },
};