const path = require('path');
const pkg = require('./package.json');
module.exports = {
  entry: "./src/components/Button/Button.jsx",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "main.js",
    library: pkg.name,
    libraryTarget: "commonjs2"
  },
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
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
            options: {
              additionalData: "$o-brand: 'internal';\n$system-code: 'gt';",
              sassOptions: {
                includePaths: [
                  "node_modules",
                  "node_modules/@financial-times"
                ],
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      }
    ]
  }
};
