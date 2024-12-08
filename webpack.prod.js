const path                   = require('path');
const webpack                = require('webpack');
const dotenv                 = require('dotenv');
const HtmlWebPackPlugin      = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin   = require('mini-css-extract-plugin');
const CssMinimizerPlugin     = require('css-minimizer-webpack-plugin');
const TerserPlugin           = require('terser-webpack-plugin');
const WorkboxPlugin          = require('workbox-webpack-plugin');

// Load environment variables from .env file
const env = dotenv.config().parsed || {};

// Prepare environment variables for DefinePlugin
const envKeys = Object.keys(env).reduce((acc, key) => {
  acc[`process.env.${key}`] = JSON.stringify(env[key]);
  return acc;
}, {});

module.exports = {
    mode: 'production',
    entry: './src/client/index.js',
    devtool: 'source-map',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'), // Ensure output.path is defined
        publicPath: '/',
    },
    optimization: {
        minimizer: [
            new TerserPlugin({}), 
            new CssMinimizerPlugin()
        ],
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'], // Extract CSS files
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            {
                test: /\.less$/,
                use: [ 'one', 'two', 'three' ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/, // For image assets
                type: 'asset/resource',
            },
        ]
    },
    // TODO: Add the plugin for index.html
    plugins: [
        new webpack.DefinePlugin(envKeys),
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new MiniCssExtractPlugin({ 
            filename: "[name].css" 
        }),
        new WorkboxPlugin.GenerateSW()
    ]
}
