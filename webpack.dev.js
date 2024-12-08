const path                   = require('path');
const webpack                = require('webpack');
const dotenv                 = require('dotenv');
const HtmlWebPackPlugin      = require("html-webpack-plugin");
const MiniCssExtractPlugin   = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Load environment variables from .env file
const env = dotenv.config().parsed || {};

// Prepare environment variables for DefinePlugin
const envKeys = Object.keys(env).reduce((acc, key) => {
  acc[`process.env.${key}`] = JSON.stringify(env[key]);
  return acc;
}, {});

module.exports = {
    mode     : 'development',
    devtool  : 'source-map',
    stats    : 'verbose',
    entry    : './src/client/index.js',
    devServer: {
        static: { 
            directory: path.join(__dirname, 'dist'), 
        },
        compress: true,
        port: 3000, // Change this to your desired port for development
        static: path.join(__dirname, 'dist'), // Where the built files are served from
        hot: true, // Enables hot module replacement
        open: true,
        proxy: [
            {
                context: ['/analyze'], // Array of paths to match
                target: 'http://localhost:3000/analyze', // Address of your server API
                changeOrigin: true,
                secure: false, // Optional, can be used for HTTP or non-secure targets
            }
        ],
    },
    // Existing config...
    output: {
        path: path.resolve(__dirname, 'dist'), // Define the output path
        filename: 'index.js', // Define the output filename
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
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
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/, // For image assets
                type: 'asset/resource',
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin(envKeys),
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin({ 
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        })
    ]
};
