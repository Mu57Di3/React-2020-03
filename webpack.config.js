const argv = require("yargs").argv;
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

const isProduction = argv.mode === "production";

const config = {
    context: path.resolve(__dirname, "./src"),
    entry: "./index.tsx",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "index.js",
    },
    devtool: isProduction ? false : "inline-source-map",
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        historyApiFallback: true,
        hot: true,
        hotOnly: true,
        port: 8080,
    },
    mode: isProduction ? "production" : "development",
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./public/index.html"),
        }),
    ],
};

if (!isProduction) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
