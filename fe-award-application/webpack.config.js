const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
  HotModuleReplacementPlugin,
  ProvidePlugin,
  DefinePlugin,
} = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const dotenv = require("dotenv");

exports.default = (env, argv) => {
  const envfile = dotenv.config({ path: `./.env.${env.target}` }).parsed;

  return ({
    entry: path.join(__dirname, "src", "index"),
    output: {
      filename: argv.mode === "development"
        ? "[name].bundle.js"
        : "[name].[contenthash].bundle.js",
      path: path.join(__dirname, "dist"),
      sourceMapFilename: "[name].js.map",
    },
    optimization: {
      runtimeChunk: "single",
      minimize: argv.mode !== "development",
    },
    resolve: {
      extensions: [".js", ".json", ".wasm", ".ts", ".tsx", ".jsx"],
      enforceExtension: false,
      fallback: {
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer"),
      },
      plugins: [
        new TsconfigPathsPlugin({
          configFile: "tsconfig.json",
        }),
      ],
    },
    module: {
      rules: [{
        test: /\.?(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: argv.mode === "development"
                  ? "[local]"
                  : "[sha256:hash:base64:32]",
              },
            },
          },
          "postcss-loader",
        ],
      },
      ],
    },
    plugins: [
      new DefinePlugin({
        "process.env": JSON.stringify(envfile),
      }),
      new HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "public", "index.html"),
        publicPath: "/",
        minify: true,
        favicon: path.join(__dirname, "public", "assets", "images", "favicon.ico"),
      }),
      new CopyPlugin({
        patterns: [{
          from: path.join(__dirname, "public", "assets"),
          to: path.join(__dirname, "dist", "assets"),
        }],
      }),
      new ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
    ],
    devServer: {
      port: 9000,
      compress: true,
      historyApiFallback: true,
      hot: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
      },
      proxy: [
        {
          context: ["/api/v1"],
          target: envfile.API_HOST,
          secure: true,
        },
      ],
    },
  });
};
