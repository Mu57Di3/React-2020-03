module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    ie: "11",
                },
            },
        ],
        "@babel/preset-typescript",
        "@babel/preset-react",
    ],
};
