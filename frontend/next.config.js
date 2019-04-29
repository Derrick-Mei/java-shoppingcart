// next.config.js
const {parsed: localEnv} = require("dotenv").config();
const withPlugins = require("next-compose-plugins");

const webpack = require("webpack");
const withCSS = require("@zeit/next-css");
const withTypescript = require("@zeit/next-typescript");
const tsConfig = {};
const cssConfig = {};

//https://github.com/cyrilwanner/next-compose-plugins

const nextConfig = {
  webpack: config => {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));

    return config;
  },
  serverRuntimeConfig: {
    //will only be available on the server side
  },
  publicRuntimeConfig: {
    // will be available on both server and client
    ...process.env,
  },
};
module.exports = withPlugins(
  [[withCSS, cssConfig], [withTypescript, tsConfig]],
  nextConfig,
);
