const path = require("path");
const webpack = require("webpack");
const custom = require("../webpack.config.js");
const rules = require("../webpack.riles");

module.exports = {
    stories: ["../stories/**/*.stories.tsx"],
    addons: ["@storybook/addon-actions", "@storybook/addon-links", "@storybook/addon-knobs/register"],
    webpackFinal: (config) => {
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
        return {
            ...config,
            resolve: {
                extensions: custom.resolve.extensions,
                alias: custom.resolve.alias
            },
            module: {
                ...config.module,
                rules: [
                    ...rules,
                    ...custom.module.rules
                ],
            },
        };
    },
};
