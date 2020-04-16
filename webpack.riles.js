module.exports = [
    {
        test: /\.(js|ts)x?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
    },
];
