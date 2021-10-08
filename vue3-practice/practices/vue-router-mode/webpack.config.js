// node.js의 환경에서 실시하는 것이기 때문에 ES6 문법 불가.
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  resolve: {
    extensions: ['.vue', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // 최종 결과를 내어주는 기능을 웹팩이 하지 않을 경우, 절대경로가 아니면 꼬일 수 있다.
    filename: 'bundle.js',
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.s?css$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: './src/static/favicon.ico',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: './src/static' }],
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
