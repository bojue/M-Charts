const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app:'./src/index.tsx',
    vendor: ['react', 'react-dom']
  },
  optimization:{

  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath:'',
    filename: 'js/[name].bundle.[hash].js'
  },
  devtool: "source-map",
  resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
      rules: [
          { 
              test: /\.tsx?$/, loader: "awesome-typescript-loader" 
          },
          {
              test: /\.s[ac]ss$/i,
              use: [
                  'style-loader',
                  'css-loader',
                  'sass-loader',
              ],
          },
          {
              test: /\.(png|svg|jpg|gif)$/,
              use: {
                  loader: 'url-loader',
                  options: {
                     imit: 3*1024
                  }
              }
          }
      
      ]
  },
  plugins: [
    new webpack.ProvidePlugin({
        "React": "react",
    }),
    new htmlWebpackPlugin({
        template: path.join(__dirname, './public/index.html'),
        favicon:'./public/favicon.ico',
        filename:'index.html',
    })
  ],
  watch:true,
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 3100,
    hot:true,
    host:"localhost",
    historyApiFallback: true,
    compress: false,
    open:"Chrome",
    openPage:''
  },
};