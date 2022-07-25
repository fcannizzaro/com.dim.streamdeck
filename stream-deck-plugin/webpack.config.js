const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  target: 'node',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules|plugin-launcher/,
      },
      {
        test: /\.node$/,
        use: 'native-addon-loader',
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.node'],
  },
  externals: {
    debug: 'debug',
    bufferutil: 'bufferutil',
    'utf-8-validate': 'utf-8-validate',
    v6: 'index.node',
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './build'),
  },
};
