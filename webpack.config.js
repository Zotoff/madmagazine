const path = require('path');

module.exports = {
  entry: [
    "./dev/js/modules/validation/jquery.validate.min.js",
    "./dev/js/modules/validation/additional-methods.min.js",
    "./dev/js/modules/jquery.waypoints.min.js",
    "./dev/js/modules/noframework.waypoints.min.js",
    "./dev/js/modules/jquery.fancybox.min.js",
    "./dev/js/main.ts"
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: "./build/js/script.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
}
