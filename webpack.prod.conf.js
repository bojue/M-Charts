const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: {   
        app:"./src/script/index.js",
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath:'',
        filename: 'js/[name].bundle.[chunkhash].js'
    },
    resolve: {
        extensions: [".ts",".js", ".json"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
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
    performance : {
        hints : false
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./public/index.html",
            filename:'index.html',
            favicon:'./dist/favicon.ico'
        }),
        new CleanWebpackPlugin(
            {
                root: path.resolve(__dirname,'../'), 
                verbose:true,
                dry: false
            }
        )
        
    ]
};