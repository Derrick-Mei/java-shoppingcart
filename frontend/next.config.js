// next.config.js
require('dotenv').config()
const webpack = require('webpack')
const withCSS = require("@zeit/next-css");
const withTypescript = require("@zeit/next-typescript");
const compose = require("next-compose");
const tsConfig = {};
const cssConfig = {};

module.exports = compose([
    [withCSS, cssConfig],
    [withTypescript, tsConfig],
    {
      webpack: (config) => {
        config.plugins.push(
            new webpack.EnvironmentPlugin(process.env)
          )
        return config
      }
    }
]);

// https://github.com/JerryCauser/next-compose
// {
//     serverRuntimeConfig: {
//       // Will only be available on the server side
//       mySecret: "secret"
//     },
//     publicRuntimeConfig: {
//       // Will be available on both server and client
//       staticFolder: "/static"
//     }
//   }
