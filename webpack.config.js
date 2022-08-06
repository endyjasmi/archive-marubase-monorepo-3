const ResolveTypescriptPlugin = require("resolve-typescript-plugin");
const webpack = require("webpack");
module.exports = {
  devtool: "inline-source-map",
  mode: "development",
  stats: "errors-only",
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: "ts-loader",
        options: { transpileOnly: true },
        test: /\.[cm]?tsx?$/,
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
    }),
  ],
  resolve: {
    fallback: {
      buffer: require.resolve("buffer/"),
      events: require.resolve("events/"),
      process: require.resolve("process/browser"),
      stream: require.resolve("readable-stream"),
      util: require.resolve("util/"),
    },
    plugins: [new ResolveTypescriptPlugin()],
  },
};
