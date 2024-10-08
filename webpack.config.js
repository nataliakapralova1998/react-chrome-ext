const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.tsx",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: { compilerOptions: { noEmit: false } },
          }
        ],
        exclude: /node_modules/,
      },
      {
        exclude: /node_modules/,
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }
    ],
  },
  resolve: { extensions: [".tsx", ".ts", ".js"] },
  output: {
    filename: "content.js",
    path: path.resolve(__dirname, "extension"),
  },
  plugins: [
    new HTMLPlugin({ template: "./public/index.html" }),
    new CopyPlugin({ patterns: [{ from: ".", to: ".", context: "public" }] }),
  ],
};