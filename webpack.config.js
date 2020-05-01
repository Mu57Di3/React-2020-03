const argv = require("yargs").argv;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const rules = require("./webpack.riles");

const isProduction = argv.mode === "production";

const config = {
    context: path.resolve(__dirname, "./src"),
    entry: "./index.tsx",
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
        alias: {
            Constants: path.resolve(__dirname, "./src/constants"),
            UI: path.resolve(__dirname, "./src/ui/index.tsx"),
        },
    },
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
            ...rules,
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
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

module.exports = config;
