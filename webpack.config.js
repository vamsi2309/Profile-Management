const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
// const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = [
  {
    entry: "./src/index.tsx",
    mode: "development",
    // devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: { presets: ["@babel/env"] },
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: "ts-loader",
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          loader: "file-loader",
        },
        {
          test: /\.(png|jpg|gif|svg|mp4)$/,
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "assets",
          },
        },
      ],
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx", ".jsx"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    output: {
      path: path.resolve(__dirname, "build/"),
      filename: "[name].[contenthash].js",
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "public", "index.html"),
      }),
      new Dotenv(),
      //   new CopyWebpackPlugin({
      //     patterns: [
      //       // {
      //       //   from: "./public/comscore.js",
      //       //   to: path.resolve(__dirname, "build"),
      //       // },
      //       {
      //         from: "./public/polyfill.js",
      //         to: path.resolve(__dirname, "build"),
      //       },
      //       {
      //         from: "./public/manifest.json",
      //         to: path.resolve(__dirname, "build"),
      //       },
      //       {
      //         from: "./public/News18_logo.png",
      //         to: path.resolve(__dirname, "build"),
      //       },
      //     ],
      //   }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, "public"),
      },
      compress: true,
      allowedHosts: "all",
      historyApiFallback: true,
      port: 3000,
    },
  },
];
