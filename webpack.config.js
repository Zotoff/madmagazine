const path = require('path');

module.exports = {
  entry: [
    "./dev/js/constants.js",
    "./dev/js/network.js",
    "./dev/js/main.js"
  ],
  output: {
    filename: "./build/js/bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
}
