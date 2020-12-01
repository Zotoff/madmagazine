const path = require('path');

module.exports = {
  entry: [
    "./dev/js/modules/validation/jquery.validate.min.js",
    "./dev/js/modules/validation/additional-methods.min.js",
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
