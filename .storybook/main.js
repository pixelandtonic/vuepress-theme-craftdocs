const path = require("path");

module.exports = {
  stories: ["../stories/**/*.stories.js"],
  addons: ["@storybook/addon-knobs/register"],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.styl$/,
      use: ["style-loader", "css-loader", "stylus-loader"],
      include: path.resolve(__dirname, "../"),
    });

    // Return the altered config
    return config;
  },
};
