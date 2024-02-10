const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // Import the webpack library
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // Automatically clean the dist folder before each build
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Extract CSS into separate files
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // Optimize and minify CSS
const TerserPlugin = require('terser-webpack-plugin'); // Minify JavaScript
const ESLintPlugin = require('eslint-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const dotenv = require('dotenv');

dotenv.config();

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    const envPath = isProduction ? './.env.production' : './.env.local';
    dotenv.config({ path: envPath });

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
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        'postcss-loader', // Add PostCSS loader
                    ],
                },
                {
                    test: /\.(scss|sass)$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        'postcss-loader', // Ensure PostCSS is applied to SASS/SCSS files as well
                        'sass-loader', // Compiles Sass to CSS
                    ],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack'],
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
            new webpack.DefinePlugin({
                'process.env': JSON.stringify(process.env)
            }),
            new ESLintPlugin({
                context: 'src',
                files: '**/*.js',
                exclude: 'node_modules',
                fix: true, // Automatically fix some issues
                cache: true, // Enable caching for faster rebuilds
            }),
        ].filter(Boolean),
        optimization: {
            minimize: isProduction,
            minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
            splitChunks: {
                chunks: 'all',
            },
        },
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            hot: true,
            historyApiFallback: true,
            open: true,
            compress: true,
            port: 3000,
            https: false,
        },
    }
};
