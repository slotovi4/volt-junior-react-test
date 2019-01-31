"use strict";

var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "eval-source-map",
  entry: [
    "webpack-hot-middleware/client?reload=true",
    path.join(__dirname, "src/app.jsx")
  ],
  resolve: {
    root: [path.resolve(__dirname, "src")],
    extensions: ["", ".js", ".jsx", ".css"]
  },
  output: {
    path: path.join(__dirname, "/public/"),
    filename: "bundle.js",
    publicPath: "/"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.tpl.html",
      inject: "body",
      filename: "index.html"
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ["react", ["es2015"], ["stage-0"]]
        }
      },
      {
        test: /\.css$/,
        loader: "style!css"
      }
    ]
  }
};
