const path = require('path');
const pkg = require('./package.json');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: "./src/index.js",
  target: "node",
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js",
    library: '__MODULE_DEFAULT_EXPORT__',
    libraryTarget: "window",
    libraryExport: 'default'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.*css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: "$o-brand: 'internal';\n$system-code: 'gt';",
              sassOptions: {
                includePaths: [
                  "node_modules",
                  "node_modules/@financial-times"
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use:
          {
            loader: 'url-loader',
            options:
              {
                limit: 8192
              }
          }
      }
    ]
  }

}
;
