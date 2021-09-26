const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [path.join(__dirname, '/src/index.js'), path.join(__dirname, './src/styles/main.scss')],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          'style-loader', // 페이지 이동 없는 단일 페이지라 MiniCSSExtractPlugin 대신 style-loader 사용
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]

      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        }
      },
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets' }
      ]
    }),
    new HtmlWebpackPlugin({ 
      template: path.join(__dirname, '/index.html'),
      favicon: path.join(__dirname, '/src/assets/favicon.png'),
      hash: true,
    }),
  ],
  devServer: {
    hot: true,
    liveReload: true,
    watchFiles: ['./index.html'],
  },
  devtool: 'source-map',
}