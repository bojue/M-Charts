const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const chunkChangeWebpackPlugin = require('chunk-change-time-webpack-plugin');
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({ size: 5 });
module.exports = {
  mode: 'development',
  entry: {
    app:'./src/index.tsx',
    vendor: ['react', 'react-dom']
  },
  performance: {
    hints: false
  },
  optimization:{
    splitChunks: {
      minSize: 10000,
      maxSize: 244000,
    },
    runtimeChunk:true
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
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: [ 'babel-loader' ]
    }),
    new webpack.ProvidePlugin({
        "React": "react",
    }),
    new htmlWebpackPlugin({
        template: path.join(__dirname, './public/index.html'),
        favicon:'./public/favicon.ico',
        filename:'index.html',
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
    compress: true,
    port: 9000,
  },
};