// next.config.js
const withCSS = require("@zeit/next-css");
const withTypescript = require("@zeit/next-typescript");
module.exports = withCSS(withTypescript());

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
