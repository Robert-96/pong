const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        { from: './src/public', to: 'public' },
      ]
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      meta: {
        'description': { name: 'description', contnet: 'Pong is a table tennis-themed arcade video game featuring simple two-dimensional graphics.' },
        'keyword': { name: 'keywords', content: 'Pong, Game, HTML, CSS, JavaScript, GitHub' },
        'og:title': { property: 'og:title', content: 'Pong - a table tennis-themed arcade video game' },
        'og:description': { property: 'og:description', content: 'Pong is a table tennis-themed arcade video game featuring simple two-dimensional graphics.' },
        'og:type': { property: 'og:type', content: 'website' },
        'og:url': { property: 'og:url', content: 'https://robert-96.github.io/pong' },
        'og:image': { property: 'og:image', content: 'https://robert-96.github.io/pong/public/preview.png' },
        'twitter:card': { name: 'twitter:card', content: 'summary_large_image' },
        'twitter:title': { name: 'twitter:title', content: 'Pong - a table tennis-themed arcade video game' },
        'twitter:description': { name: 'twitter:description', content: 'Pong is a table tennis-themed arcade video game featuring simple two-dimensional graphics.' },
        'twitter:image': { name: 'twitter:image', content: 'https://robert-96.github.io/pong/public/preview.png' }
      }
    }),
    new FaviconsWebpackPlugin({
      logo: './src/public/pong.png',
      mode: 'webapp',
      devMode: 'webapp',
      favicons: {
        appName: 'Pong - a table tennis-themed arcade video game',
        appShortName: 'Pong',
        appDescription: 'Pong is a table tennis-themed arcade video game featuring simple two-dimensional graphics.',
        theme_color: '#2D3748',
        orientation: 'landscape',
        scope: '/pong/',
        start_url: '/pong/'
      }
    })
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              "@babel/plugin-proposal-class-properties"
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { importLoaders: 1 } },
        ],
      }
    ]
  }
};