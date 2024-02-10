const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // Import the webpack library
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // Automatically clean the dist folder before each build
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Extract CSS into separate files
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // Optimize and minify CSS
const TerserPlugin = require('terser-webpack-plugin'); // Minify JavaScript

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: './src/index.js', // Your entry point
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProduction ? '[name].[contenthash].js' : '[name].bundle.js',
            publicPath: '/',
            clean: true, // Clean the output directory before emit.
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
                    use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html', // Path to your HTML template
            }),
            new webpack.HotModuleReplacementPlugin(), // Enable HMR
            new ReactRefreshWebpackPlugin(), // Add this line
            new CleanWebpackPlugin(),
            isProduction && new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
            }),
        ].filter(Boolean),
        optimization: {
            minimize: isProduction,
            minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
            splitChunks: {
                chunks: 'all', // Enable splitting for all chunks
            },
        },
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
    }
};
