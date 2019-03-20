// next.config.js
const {parsed: localEnv} = require("dotenv").config();
const webpack = require("webpack");
const withCSS = require("@zeit/next-css");
const withTypescript = require("@zeit/next-typescript");
const tsConfig = {};
const cssConfig = {};

// https://github.com/JerryCauser/next-compose
const compose = require("next-compose");

module.exports = compose([
  [withCSS, cssConfig],
  [withTypescript, tsConfig],
  {
    webpack: config => {
      config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
      return config;
    },
  },
]);
