const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/examples/index.tsx",
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/examples/index.html" })],
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  devServer: {
    port: 3000
  }
};
