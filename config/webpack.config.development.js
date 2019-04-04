const autoprefixer = require('autoprefixer')
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const SimpleProgressWebpackPlugin = require( 'simple-progress-webpack-plugin' )

module.exports = (env, argv) => ({
  entry: {
    main: path.resolve(__dirname, `../src/index.js`),
  },
  output: {
    path: path.resolve(__dirname, `../build`),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    modules: [
      'node_modules',
    ],
    symlinks: false,
  },
  watchOptions: {
    poll: true
  },
  devServer: {
    noInfo: false,
    port: 3000,
    open: true
  },
  plugins: [
    new SimpleProgressWebpackPlugin({
      format: 'compact'
    }),
    new HtmlWebPackPlugin({
      hash: true,
      template: path.resolve(__dirname, `../public/index.html`),
      filename: 'index.html',
      favicon: path.resolve(__dirname, `../public/favicon.ico`)
    }),
    new Dotenv({
      path: path.resolve(__dirname, `../.env.${ argv.mode }`),
      systemvars: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      // "url" loader works just like "file" loader but it also embeds
      // assets smaller than specified size as data URLs to avoid requests.
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            rootMode: 'upward'
          }
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
        ],
      }
    ],
  },
  optimization: {
    splitChunks: {
      name: true,
      chunks: 'all',
    }
  }
})
