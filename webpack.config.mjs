import path from "path";
import nodeExternals from "webpack-node-externals";
import { fileURLToPath } from "url";
import { merge } from "webpack-merge";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mode = "development";

const frontConfig = {
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: "./front/dist",
    },
    hot: true,
    compress: true,
    port: 5006,
    proxy: [{
      context: ['/socket.io'],
      target: 'http://localhost:8080'
    }]
  },
  target: "web",
  entry: "./front/src/index.tsx",
  output: {
    filename: "bundle-front.js",
    path: path.resolve(__dirname, "front/dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      meta: {
        viewport:
          "width=device-width, initial-scale=1, minimum-scale=1,shrink-to-fit=no",
      },
      inject: "body",
      template: "./front/src/index.html",
      favicon: "./front/src/favicon.png",
    }),
  ],
};

const backConfig = {
  externals: [nodeExternals()],
  externalsPresets: {
    node: true,
  },
  entry: "./back/src/server.ts",
  output: {
    filename: "bundle-back.js",
    path: path.resolve(__dirname, "back/dist"),
    clean: true,
  },
};

const common = {
  mode,
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(?:ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".mjs", "..."],
  },
};

export default [merge(common, frontConfig), merge(common, backConfig)];
