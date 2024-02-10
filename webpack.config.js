const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // Import the webpack library

module.exports = {
    entry: './src/index.js', // Your entry point
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['react-refresh/babel'].filter(Boolean), // Enable React Refresh Babel plugin
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', // Path to your HTML template
        }),
        new webpack.HotModuleReplacementPlugin(), // Enable HMR
        new ReactRefreshWebpackPlugin(), // Add this line
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'), // Update from 'contentBase' to 'static.directory'
        },
        hot: true, // Enable HMR
        historyApiFallback: true, // Useful for single-page applications
        open: true, // Automatically open the browser
        compress: true, // Enable gzip compression
        port: 3000, // Specify the port
        https: false,
    },
};
